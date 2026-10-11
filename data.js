// ===== EDIT YOUR CONTENT HERE =====
window.SITE = {
  email: "abdelrahmanrabie00@gmail.com",
  linkedin: "https://linkedin.com/in/abdelrahman-rabie-ahmed/",
  github: "", // e.g. "https://github.com/yourname" — leave empty to hide
  cv: "assets/Abdelrahman_Rabie_CV.pdf",
  skills: [
    ["Hardware & embedded", "Arduino, ESP32, Raspberry Pi, micro:bit, Embedded C, AVR interfacing, UART / SPI / I2C, Verilog, FPGA (Basys 3), Proteus, Vivado, Xilinx ISE"],
    ["Software", "C/C++, Java, Python, OOP, Data structures & algorithms, HTML / CSS / JavaScript, SQL & MySQL, Git & GitHub"],
    ["AI & signal processing", "Signal processing, deep learning, PPG-based health sensing"],
    ["Teaching", "Coding with Scratch, Godot, mBlock and Python; Arduino and digital fabrication; robotics mentoring"]
  ],
  experience: [
    ["Training Specialist", "San3a Tech", "Apr 2026 – Present", "Job", ["Design and deliver training programs in digital fabrication and physical computing."]],
    ["Junior Specialist Instructor", "San3a Tech", "Apr 2025 – Oct 2025", "Job", ["Taught digital fabrication and Arduino for building smart solutions to real-life challenges.", "Mentored a group of 12 girls through hands-on prototyping projects."]],
    ["Coding Instructor", "Udacity", "Aug 2023 – Jul 2025", "Job", ["Taught Python and coding to around 300 preparatory and secondary students."]],
    ["Coding Instructor", "Ischool", "May 2024 – Aug 2024", "Job", ["Taught around 150 primary students using Scratch, Godot and mBlock."]],
    ["President, Robotics Student Activity", "Aswan Practical Engineering Lab (APEL)", "Aug 2024 – Jul 2025", "Leadership", ["Managed ARC 9 Time Out, a competition across Upper Egypt with 42 teams.", "Coordinated robotics workshops and the team's first media workshop."]],
    ["Technical Head / Vice / Member", "APEL", "Aug 2022 – Aug 2024", "Leadership", ["Led technical teams for ARC8 and taught robotics and programming sessions; earlier helped organize ARC7."]],
    ["Junior Teaching Assistant", "Faculty of Engineering, Aswan University", "Aug 2022 – May 2023", "Job", ["Assisted students in Introduction to Programming with FORTRAN and C++."]]
  ],
  credentials: [
    ["Jul – Sep 2025", "Embedded Systems Essentials — Siemens (3 months): embedded architecture, microcontrollers and memory, agile development and functional safety."],
    ["Oct – Nov 2023", "Embedded System Course — TIEC (15 days): embedded fundamentals and AVR interfacing on a hardware kit."],
    ["Aug – Sep 2023", "Embedded System Diploma — NTI (90 hours): C and Embedded C; built a system for publishing and querying student grades."],
    ["Aug 2024", "Best Head — APEL"], ["Jul 2022", "Best Member — APEL"], ["Jun 2022", "10th place in Code Storm — IEEE Aswan"]
  ],
  // Each project gets a card + a full detail section with 3 photos.
  // Photos: put files in assets/projects/<slug>/ and list them in `photos` (caption optional).
  // Optional fields you can fill in later: github, demo, notes (extra bullet points), results.
  projects: [
    {
      slug: "glucoai", featured: true, category: "AI & Healthcare", period: "Graduation project · 2025–2026",
      title: "Non-Invasive Blood Glucose Level Estimation Using Smartphone PPG Signals",
      short: "An end-to-end pipeline that turns smartphone camera videos into PPG signals and estimates blood glucose with deep learning.",
      problem: "Glucose monitoring usually relies on finger-prick tests. This project explores a more accessible, non-invasive approach using only a smartphone camera.",
      role: "Designed and implemented the end-to-end pipeline for PPG extraction, signal processing and deep learning–based glucose estimation.",
      steps: ["Capture a fingertip video with a smartphone camera", "Extract the photoplethysmography (PPG) signal from the video", "Process and clean the signal", "Estimate blood glucose with a deep learning model"],
      tech: ["Python", "Signal processing", "Deep learning", "Computer vision"],
      results: ["Graduation project grade: Excellent."],
      note: "Research prototype. It has not been clinically validated and is not a replacement for established glucose measurement devices.",
      notes: [], github: "", demo: "",
      photos: [["assets/projects/glucoai/1.jpg", "Photo 1"], ["assets/projects/glucoai/2.jpg", "Photo 2"], ["assets/projects/glucoai/3.jpg", "Photo 3"]]
    },
    {
      slug: "alu-fpga", category: "Digital design", period: "Dec 2024",
      title: "ALU based on FPGA",
      short: "An arithmetic logic unit implemented on the Basys 3 FPGA board.",
      problem: "Course project in the Computer Engineering Department, Aswan University: implement core processor arithmetic in hardware.",
      role: "Created an ALU on the Basys 3 board to perform advanced tasks.",
      steps: [], tech: ["Verilog", "FPGA (Basys 3)", "Vivado"],
      results: [], notes: [], github: "", demo: "",
      photos: [["assets/projects/alu-fpga/1.jpg", "Photo 1"], ["assets/projects/alu-fpga/2.jpg", "Photo 2"], ["assets/projects/alu-fpga/3.jpg", "Photo 3"]]
    },
    {
      slug: "school-degree-system", category: "Software", period: "Sep – Dec 2024",
      title: "School Degree Management System",
      short: "A system for schools to manage grades and print student results.",
      problem: "Schools need a simple way to manage student degrees and produce result sheets.",
      role: "Built the system using object-oriented programming in Java.",
      steps: [], tech: ["Java", "OOP"],
      results: [], notes: [], github: "", demo: "",
      photos: [["assets/projects/school-degree-system/1.jpg", "Photo 1"], ["assets/projects/school-degree-system/2.jpg", "Photo 2"], ["assets/projects/school-degree-system/3.jpg", "Photo 3"]]
    },
    {
      slug: "blood-bank", category: "Software", period: "May 2023",
      title: "Blood Bank",
      short: "A system serving donors and patients for safe, efficient blood management.",
      problem: "Blood banks need to match the needs of donors and patients while keeping blood management safe and efficient.",
      role: "Built the system in C++ using OOP and file storage.",
      steps: [], tech: ["C++", "OOP", "File handling"],
      results: [], notes: [], github: "", demo: "",
      photos: [["assets/projects/blood-bank/1.jpg", "Photo 1"], ["assets/projects/blood-bank/2.jpg", "Photo 2"], ["assets/projects/blood-bank/3.jpg", "Photo 3"]]
    }
  ]
};
