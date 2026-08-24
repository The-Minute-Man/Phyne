import argparse
import asyncio
import os
import sys
import json
from google.antigravity import Agent, LocalAgentConfig, CapabilitiesConfig

def load_prompt(filename):
    filepath = os.path.join(os.path.dirname(__file__), "prompts", filename)
    with open(filepath, "r") as f:
        return f.read()

def read_generated_files(unit, lesson):
    page_path = os.path.join(os.getcwd(), "src", "app", "learn", unit, lesson, "page.tsx")
    q_path = os.path.join(os.getcwd(), "src", "questions", unit, f"{lesson}.tsx")
    
    page_code = "FILE NOT FOUND"
    q_code = "FILE NOT FOUND"
    
    if os.path.exists(page_path):
        with open(page_path, "r") as f:
            page_code = f.read()
            
    if os.path.exists(q_path):
        with open(q_path, "r") as f:
            q_code = f.read()
            
    return page_code, q_code

async def main():
    parser = argparse.ArgumentParser(description="Generate a Phyne lesson using multi-agent orchestrator.")
    parser.add_argument("--unit", required=True, help="The unit slug (e.g., kinematics)")
    parser.add_argument("--lesson", required=True, help="The lesson slug (e.g., 1d-motion)")
    parser.add_argument("--title", required=True, help="The lesson title")
    args = parser.parse_args()

    unit = args.unit
    lesson = args.lesson
    title = args.title
    
    print(f"Starting lesson generation for {unit}/{lesson}...")

    # Phase 1: Planner
    planner_prompt = load_prompt("planner_prompt.txt")
    planner_config = LocalAgentConfig(
        system_instructions=planner_prompt,
        capabilities=CapabilitiesConfig() 
    )
    
    plan_text = ""
    async with Agent(planner_config) as planner:
        print("\n--- [Phase 1: Planner] ---")
        prompt = f"Please read the CED and HRK textbooks in the resources directory. Generate an implementation plan for Unit: '{unit}', Lesson: '{lesson}'. Output the plan in a strict JSON format."
        response = await planner.chat(prompt)
        plan_text = response.text
        print("Planner finished.")

    # Phase 1.5: Curriculum Alignment Reviewer
    reviewer_prompt = load_prompt("reviewer_prompt.txt")
    reviewer_config = LocalAgentConfig(
        system_instructions=reviewer_prompt,
        capabilities=CapabilitiesConfig()
    )

    final_plan_text = ""
    async with Agent(reviewer_config) as reviewer:
        print("\n--- [Phase 1.5: Curriculum Reviewer] ---")
        prompt = f"Here is the proposed lesson plan JSON:\n\n{plan_text}\n\nPlease review it against the CED and HRK, ensure no premature concepts, and output the final validated JSON plan."
        response = await reviewer.chat(prompt)
        final_plan_text = response.text
        print("Reviewer finished.")

    # Phase 2: Developer (with integrated debugging)
    developer_prompt = load_prompt("developer_prompt.txt")
    dev_config = LocalAgentConfig(
        system_instructions=developer_prompt,
        capabilities=CapabilitiesConfig()
    )

    async with Agent(dev_config) as developer:
        print("\n--- [Phase 2: Developer] ---")
        prompt = (f"Here is the finalized lesson plan to build:\n{final_plan_text}\n\n"
                  f"1. Use your run_command tool to run 'npm run create-lesson {unit} {lesson} \"{title}\"'.\n"
                  f"2. Write the React code in src/app/learn/{unit}/{lesson}/page.tsx and the question code in src/questions/{unit}/{lesson}.tsx.\n"
                  f"3. Run 'npx tsc --noEmit' in the root directory. If there are errors, fix them before concluding your turn.")
        response = await developer.chat(prompt)
        print("Developer finished.")

        # Phase 3: QA Loop (Up to 10 iterations)
        qa_prompt = load_prompt("qa_prompt.txt")
        qa_config = LocalAgentConfig(
            system_instructions=qa_prompt,
            capabilities=CapabilitiesConfig()
        )

        async with Agent(qa_config) as qa:
            print("\n--- [Phase 3: QA] ---")
            for attempt in range(10):
                print(f"QA attempt {attempt + 1}...")
                page_code, q_code = read_generated_files(unit, lesson)
                
                qa_check_prompt = (f"Review the generated code in src/app/learn/{unit}/{lesson}/page.tsx and src/questions/{unit}/{lesson}.tsx.\n\n"
                                   f"PAGE CODE:\n```tsx\n{page_code}\n```\n\n"
                                   f"QUESTIONS CODE:\n```tsx\n{q_code}\n```\n\n"
                                   f"Evaluate based on your system instructions. Respond with PASS or FAIL with reasons.")
                
                qa_response = await qa.chat(qa_check_prompt)
                print(qa_response.text)
                
                if "PASS" in qa_response.text:
                    print("\nQA Passed! Lesson generation complete.")
                    break
                else:
                    print(f"\nQA Failed (Attempt {attempt+1}). Sending feedback to developer...")
                    # Feed QA critique directly back to the Developer to fix
                    await developer.chat(f"QA rejected your code. Please fix these issues:\n{qa_response.text}\nThen run 'npx tsc --noEmit' again to ensure it builds.")
            else:
                print("\nQA failed after 10 attempts. Manual intervention required.")

if __name__ == "__main__":
    asyncio.run(main())
