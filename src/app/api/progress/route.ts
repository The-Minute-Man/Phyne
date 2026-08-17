import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
    console.error('Error fetching progress:', error);
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
  }

  // If no progress exists yet, return default structure
  if (!data) {
    return NextResponse.json({
      user_id: user.id,
      completed_lessons: [],
      completed_units: [],
      node_progress: {},
      completed_questions: [],
      grades: { tests: 0, quizzes: 0, lessons: 0, daily: 0 },
      daily_streak: 0,
      best_streak: 0,
      last_daily_completed: null,
      question_states: {}
    });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action } = body;

    // First fetch current progress to merge
    let { data: currentProgress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!currentProgress) {
      // Initialize if doesn't exist
      const { data: inserted, error: insertError } = await supabase
        .from('user_progress')
        .insert({
          user_id: user.id,
          completed_lessons: [],
          completed_units: [],
          node_progress: {},
          completed_questions: [],
          grades: { tests: 0, quizzes: 0, lessons: 0, daily: 0 },
          daily_streak: 0,
          best_streak: 0,
          last_daily_completed: null,
          question_states: {}
        })
        .select()
        .single();
        
      if (insertError) throw insertError;
      currentProgress = inserted;
    }

    let updates: any = {};

    if (action === 'complete_node') {
      const { lessonId, nodeId } = body;
      const nodeProg = { ...currentProgress.node_progress };
      
      if (!nodeProg[lessonId]) {
        nodeProg[lessonId] = { completed: [], current: nodeId };
      }
      
      if (!nodeProg[lessonId].completed.includes(nodeId)) {
        nodeProg[lessonId].completed.push(nodeId);
      }
      nodeProg[lessonId].current = nodeId;
      
      updates.node_progress = nodeProg;
    } 
    else if (action === 'complete_lesson') {
      const { lessonId, unitId } = body;
      const completedLessons = new Set(currentProgress.completed_lessons);
      completedLessons.add(lessonId);
      updates.completed_lessons = Array.from(completedLessons);
      
      // Optionally check if all lessons in unit are complete to mark unit complete...
      // Simplification for now:
      const completedUnits = new Set(currentProgress.completed_units);
      // Logic for adding unitId to completedUnits would go here
      
      updates.completed_units = Array.from(completedUnits);
    }
    else if (action === 'answer_question') {
      const { questionId, points, category } = body; // category: 'lessons' | 'daily'
      
      // Mark question completed
      const completedQs = new Set(currentProgress.completed_questions);
      completedQs.add(questionId);
      updates.completed_questions = Array.from(completedQs);
      
      // Update grades
      const grades = { ...currentProgress.grades };
      grades[category] = (grades[category] || 0) + points;
      updates.grades = grades;
    }
    else if (action === 'complete_daily_set') {
      const today = new Date().toISOString().split('T')[0];
      if (currentProgress.last_daily_completed !== today) {
        updates.last_daily_completed = today;
        updates.daily_streak = currentProgress.daily_streak + 1;
        if (updates.daily_streak > currentProgress.best_streak) {
          updates.best_streak = updates.daily_streak;
        }
      }
    }
    else if (action === 'save_question_state') {
      const { questionId, state } = body;
      const qStates = { ...(currentProgress.question_states || {}) };
      qStates[questionId] = state;
      updates.question_states = qStates;
    }

    if (Object.keys(updates).length > 0) {
      const { error: updateError } = await supabase
        .from('user_progress')
        .update(updates)
        .eq('user_id', user.id);

      if (updateError) throw updateError;
    }

    return NextResponse.json({ success: true, ...updates });
  } catch (error) {
    console.error('Progress update error:', error);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}
