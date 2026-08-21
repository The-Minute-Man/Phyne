import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'You are not logged in. Please log in first.' }, { status: 401 });
  }

  // Fetch current progress
  const { data: currentProgress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (!currentProgress) {
    return NextResponse.json({ error: 'No progress found to reset.' });
  }

  // Remove dva-3 from question_states
  const qStates = { ...currentProgress.question_states };
  delete qStates['dva-3'];
  
  // Remove dva-3 from completed_questions
  const completedQs = currentProgress.completed_questions.filter((id: string) => id !== 'dva-3');

  // Update Supabase
  const { error } = await supabase
    .from('user_progress')
    .update({
      question_states: qStates,
      completed_questions: completedQs
    })
    .eq('user_id', user.id);

  if (error) {
    return NextResponse.json({ error: 'Failed to update database.', details: error });
  }

  return NextResponse.json({ 
    success: true, 
    message: 'Question dva-3 has been reset successfully! You can close this tab and refresh your lesson page to try the question again.' 
  });
}
