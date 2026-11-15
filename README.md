# SaveraCare — Dignity-First Elder Care & Autonomous Medication Ecosystem

> Built for **Catalyst by MnM x PromptWars (Google for Developers)**
> **Live Demo:** `[INSERT_VERCEL_LINK_HERE]` | **Backend API:** `[INSERT_RENDER_LINK_HERE]`

---

## 1. Problem Statement & Core Philosophy
Traditional medication reminder apps treat elderly individuals as passive dependents—silently overriding their schedules or overwhelming them with cold, high-density interfaces. **SaveraCare** reimagines connected elder care around **Mutual Dignity, Cognitive Clarity, and Proactive Escalation**:
1. **Passcode-Protected Shared Care Circle (`PIN: 2468`):** A unified ecosystem connecting the **Elderly Individual**, **Family Members**, and **Caretakers/Clinicians**.
2. **Dignity-First Mutual Consent Protocol:** When a family member proposes a schedule change or adds a non-emergency routine, it enters an **Elder Consent Queue** where the senior approves or retains their preferred timing—keeping the elderly person at the center of their healthcare decisions.
3. **3D Visual Pill Companion & Bilingual Voice Readout (EN / HI):** Eliminates "white-pill confusion" by rendering realistic CSS pill shapes/colors (`Oval Ivory Tablet`, `Small Round Peach Pill`, `Two-Tone Teal Capsule`) paired with zero-latency English and Hindi speech synthesis (`window.speechSynthesis`).
4. **Proactive Dual-Tier Email Reminder Engine:** Automatically dispatches structured HTML email alerts (`smtplib` + instant sandbox outbox inspector) for **Missed Medications**, **Upcoming Doses**, and **Upcoming Doctor Appointments**.
5. **Gemini 2.5 Flash Polypharmacy & Clinical Handover Copilot:** Evaluates active prescriptions alongside daily self-reported mood/vitals to flag drug-food/timing clashes (e.g., Calcium vs. Antibiotic spacing), translates clinical notes into warm plain language, and generates a **1-Click Printable Hospital Handover Sheet**.

---

## 2. System Architecture & Repository Structure

```text
catalyst-mvp/
├── backend/                  # FastAPI + Pydantic v2 + Gemini 2.5 Flash + SMTP Engine
│   ├── main.py               # REST endpoints with zero-crash deterministic fallbacks
│   └── requirements.txt      # Minimal production dependencies for cloud deployment
├── frontend/                 # React (Vite) + Tailwind CSS v3 + Lucide Icons
│   ├── src/
│   │   ├── App.jsx           # Warm Daylight Editorial Studio & Care Circle Portal
│   │   ├── main.jsx          # Application entry point
│   │   └── index.css         # Tailwind directives & print layout rules
│   ├── package.json
│   └── tailwind.config.js
└── README.md                 # Architecture & evaluation documentation