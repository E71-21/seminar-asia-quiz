import random
from difflib import get_close_matches
import os

quiz_data = {
    "Yemen": "Sana'a",
    "Oman": "Muscat",
    "Saudi Arabia": "Riyadh",
    "United Arab Emirates": "Abu Dhabi",
    "Qatar": "Doha",
    "Bahrain": "Manama",
    "Kuwait": "Kuwait City",
    "Jordan": "Amman",
    "Israel": "Jerusalem",
    "Lebanon": "Beirut",
    "Syria": "Damascus",
    "Iraq": "Baghdad",
    "Iran": "Tehran",
    "Turkey": "Ankara",
    "Azerbaijan": "Baku",
    "Armenia": "Yerevan",
    "Georgia": "Tbilisi",
    "Russia": "Moscow",
    "Kazakhstan": "Astana",
    "Kyrgyzstan": "Bishkek",
    "Uzbekistan": "Tashkent",
    "Turkmenistan": "Ashgabat",
    "Tajikistan": "Dushanbe",
    "China": "Beijing",
    "Afghanistan": "Kabul",
    "Pakistan": "Islamabad",
    "India": "New Delhi",
    "Nepal": "Kathmandu"
}

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def ask_quiz(questions):
    score = 0
    missed = []
    countries = list(questions.keys())
    random.shuffle(countries)

    print("\n🧭 QUIZ MODE — type the capital, 'hint' for help, or 'exit' to quit.\n")

    for country in countries:
        correct = questions[country]
        while True:
            answer = input(f"What is the capital of {country}? ").strip()
            if answer.lower() == "exit":
                return score, missed
            if answer.lower() == "hint":
                print(f"💡 Hint: starts with '{correct[:3]}'...\n")
                continue

            if answer.lower() == correct.lower():
                print(random.choice(["✅ Great job!", "🎯 Nice!", "💪 You got it!", "🔥 Correct!"]) + "\n")
                score += 1
            else:
                close = get_close_matches(answer.lower(), [correct.lower()], n=1, cutoff=0.7)
                if close:
                    print(f"🟡 Almost! The correct answer is {correct}.\n")
                    score += 0.5
                else:
                    print(f"❌ Incorrect. The correct answer is {correct}.\n")
                    missed.append(country)
            break
    return score, missed

def grade_quiz(score, total):
    pct = (score / total) * 100
    if pct >= 90: grade = "A"
    elif pct >= 80: grade = "B"
    elif pct >= 70: grade = "C"
    elif pct >= 60: grade = "D"
    else: grade = "F"
    return pct, grade

def flashcards(questions):
    """Simple flashcard mode: press space or enter to flip and continue."""
    items = list(questions.items())
    random.shuffle(items)
    clear_screen()
    print("🃏 FLASHCARD MODE — press Enter/Space to flip cards. Type 'exit' to quit.\n")

    for country, capital in items:
        inp = input(f"🌍 Country: {country}\n(Press Enter/Space to reveal) ").strip().lower()
        if inp == "exit":
            break
        print(f"🏙️  Capital: {capital}")
        input("(Press Enter/Space for next)\n")
        clear_screen()

    print("✅ Flashcard session complete! Nice job reviewing them all.\n")

def drill_mode(missed):
    print("\n✍️ Drill Round — type both the COUNTRY and CAPITAL correctly 5 times each.\n")
    random.shuffle(missed)
    for country in missed:
        capital = quiz_data[country]
        print(f"\n🧠 The correct answer is: {country}: {capital}")
        print("Type it in that format (Country: Capital):")
        for i in range(1, 6):
            user_input = input(f"({i}/5) → ").strip().lower()
            if ":" not in user_input:
                print(f"❌ Use a colon, like this → {country}: {capital}")
                continue
            parts = [p.strip() for p in user_input.split(":", 1)]
            if len(parts) == 2 and parts[0].lower() == country.lower() and parts[1].lower() == capital.lower():
                print(random.choice(["✅ Nice!", "👏 Perfect!", "💡 Correct!"]) + "\n")
            else:
                print(f"❌ Not quite — remember: {country}: {capital}")

# --- MAIN PROGRAM LOOP ---
while True:
    print("🌍 CENTRAL & SOUTHWEST ASIA CAPITALS STUDY SUITE 🌍")
    print("1️⃣ Quiz Mode")
    print("2️⃣ Flashcard Mode")
    print("3️⃣ Exit\n")

    choice = input("Choose a mode (1-3): ").strip()
    clear_screen()

    if choice == "1":
        score, missed = ask_quiz(quiz_data)
        total = len(quiz_data)
        pct, grade = grade_quiz(score, total)
        print(f"\n📊 RESULTS: {score:.1f}/{total} ({pct:.1f}%) — Grade {grade}\n")

        if missed:
            print("You missed these countries:")
            for c in missed:
                print(f" - {c}: {quiz_data[c]}")

            retry = input("\nRetry missed ones? (y/n): ").strip().lower()
            if retry == "y":
                retry_data = {c: quiz_data[c] for c in missed}
                clear_screen()
                score2, missed2 = ask_quiz(retry_data)
                pct2, grade2 = grade_quiz(score2, len(missed))
                print(f"Retry Score: {score2:.1f}/{len(missed)} ({pct2:.1f}%) — Grade {grade2}\n")

            drill = input("Would you like to drill your missed ones (type them 5×)? (y/n): ").strip().lower()
            if drill == "y":
                drill_mode(missed)

    elif choice == "2":
        flashcards(quiz_data)

    elif choice == "3":
        print("Good luck on your quiz Friday — you’ve got this! 💪")
        break

    else:
        print("Invalid choice — try again.\n")
