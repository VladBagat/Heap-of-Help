<script lang="js">
    let profile = $state('');
    let forename = $state('');
    let surname = $state('');
    let age = $state('');
    let email = $state('');
    let language = $state('');
    let timezone = $state('');
    let education = $state('')
    let username = $state('');
    let password = $state('');
    let confirm_password = $state('');
    let description = $state('');
    let profile_img = $state('');
    let selectedTags = $state([]);

    let currentStage = $state(1);

    const regex = new RegExp('^[a-z0-9_-]{3,15}$');
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordregex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;
  
    function nextStage() {
      if (currentStage < 3 && validation(currentStage)) {
        currentStage += 1;
      }
    }

    function finalStage() {
      if (validation(currentStage)){
        registration();
        ProfileRedirect();
        console.log(selectedTags);
      }
    }

    function previousStage() {
      if (currentStage > 1) {
        currentStage -= 1;
      }
    }
    
    function validation(){
      if (currentStage == 1){
        if (profile === "") {
          alert("Please select if you are a Tutor or Student");
          return false;
        }
        if (forename == "" || forename.match(/\d/)) {
          alert("Please enter a valid forename");
          return false;
        }
        if (surname.trim() == "" || surname.match(/\d/)) {
          alert("Please enter a valid surname");
          return false;
        }
        if (email.trim() == "") {
          alert("Please enter your email");
          return false;
        }
        if (!emailregex.test(email.trim())) {
          alert("Please enter a valid email address");
          return false;
        }
        if (education.trim() == "") {
          alert("Please enter your education");
          return false;
        }
        if (age <= 0 || age > 99) {
          alert("Please enter a valid age");
          return false;
        }
        if(age <= 12){
          alert("You must be older than 13 to join")
          return false;
        }
        if (language.trim() == "" || language.match(/\d/)) {
          alert("Please enter a valid language");
          return false;
        }
        if (timezone.trim() == "") {
          alert("Please enter your time zone");
          return false;
        }
        return true;
        }
      else if (currentStage == 2){
        if (!username || username.trim() == "") {
          alert("Please enter a username");
          return false;
        }
        if (!username_validation) {
          alert("Please check the username")
          return false;
        }
        if (!password || password.trim() == "") {
          alert("Please enter a password");
          return false;
        }
        if (password.length < 8) {
          alert("Password must be at least 8 characters");
          return false;
        }
        if (!confirm_password || confirm_password.trim() == "") {
          alert("Please confirm your password");
          return false;
        }
        if (password != confirm_password) {
          alert("Passwords do not match");
          return false;
        }
        if (!description || description.trim() == "") {
          alert("Please enter a short description");
          return false;
        }
        // Profile picture is optional, so we don't validate it
        return true;
      }

      else if (currentStage == 3){
        if(selectedTags.length == 0){
          alert("Please choose at least 1 tag")
          return false;
        }
        return true;
      }
      return false;
    }

    function pw_values_check(){
      if (!passwordregex.test(password)) {
        document.getElementById('pw_values_message').style.color = 'red';
        document.getElementById('pw_values_message').innerHTML = 'At least one uppercase, one number and one special character';
      } else {
        document.getElementById('pw_values_message').style.color = 'green';
        document.getElementById('pw_values_message').innerHTML = 'Complexity ✓';
      }
    }

    function pw_length_check() {
      if (password.length < 8) {
        document.getElementById('pw_length_message').style.color = 'red';
        document.getElementById('pw_length_message').innerHTML = 'At least 8 characters';
      } else {
        document.getElementById('pw_length_message').style.color = 'green';
        document.getElementById('pw_length_message').innerHTML = 'Length ✓';
      }
    }

	function pw_match_check() {
      if (password == confirm_password & password != "") {
        document.getElementById('pw_match_message').style.color = 'green';
        document.getElementById('pw_match_message').innerHTML = 'Matching ✓';
      } else {
        document.getElementById('pw_match_message').style.color = 'red';
        document.getElementById('pw_match_message').innerHTML = 'Not matching';
      }
    }

    import Password from '$lib/password.svelte';

    async function registration()
     {
        console.log(profile)
        console.log(forename)
        console.log(surname)
        console.log(age)
        console.log(email)
        console.log(language)
        console.log(timezone)
        console.log(username)
        console.log(password)
        console.log(confirm_password)
        console.log(description)
        console.log(selectedTags)

        let tag_list = []

        for (let i = 0; i < selectedTags.length; i++) {
          tag_list.push(selectedTags[i].name);
        }
        console.log(tag_list)

        // If pass not valid, user isn't registered
        //let valid = Password_Validation(password, confirm_password)
        if (password == confirm_password) {
            // document.getElementById("error").innerHTML = ''
            const payload = { profile: profile, 
              forename: forename, 
              surname: surname, 
              email: email, 
              age: age,
              language: language, 
              timezone: timezone, 
              username: username,  
              password: password, 
              confirm_password: confirm_password, 
              education: education,
              description: description, 
              profile_img: base64Image,
              selectedTags: tag_list};
            console.log(payload);

            const res = await fetch('api/registration', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const json = await res.json();

            console.log(json)

            if (json[0].success) {
                IndexRedirect()
            }
        }
        else{
            console.log(valid);
            document.getElementById("error").innerHTML = valid;
        }
    }
    

    import { goto } from '$app/navigation';

    function ToggleVisability(fieldId) {
        const field = document.getElementById(fieldId);
        // ? is a ternary operator, basically a one line if statement
        // If password hidden when the toggle is pressed it wil be shown, otherwise it will be hidden
        document.getElementById(fieldId).type = (field.type === "password") ? "text" : "password";
    }

    function LoginRedirect(){
        goto('/login');
    }

    function submitForm() {
      alert('Submit!');
    }

    function ProfileRedirect(){
      goto('\profile');
    }

    let base64Image = $state('');

    function handle_profile_img(event) {
        const file = event.target.files[0];
        if (file) {
            profile_img = file;
        } else {
            profile_img = "static/profile.avif"
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            base64Image = e.target.result;  // Get Base64 string
            console.log("Base64 Encoded Image:", base64Image);
        };
        reader.readAsDataURL(file);  // Convert to Base64
    }

	let username_validation = $state(false);
    async function valid_username() {
      if (username.trim() == "") {
        alert("Username cannot be empty")
        username_validation = false;
      } else if (username_validation){
        username_validation = false;
      } else if (!regex.test(username)) { 
        alert("Username must be between 3 to 15 characters and only containing letters, numbers and underscore")
        username_validation = false;
      } else {
        const payload = {username: username};
        console.log(payload)

        const res = await fetch('api/validate_username', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const json = await res.json();

        console.log(json)

        if (json[0].success) {
          username_validation = true;
        } else {
          username_validation = false;
        }
      }
    }


    import Tree from '../../lib/Tree.svelte';
    
    // topic selection
    function handleTopicOperation(event) {
        const { topic, operation } = event.detail;
        
        if (operation === 'add') {
            if (!selectedTags.some(t => t.name === topic.name)) {
                // check if reached max
                if (selectedTags.length >= 5) {
                    console.log('Maximum 5 topics allowed');
                    return;
                }
                selectedTags = [...selectedTags, topic];
                console.log('Added topic:', topic.name);
            }
        } else if (operation === 'remove') {
          selectedTags = selectedTags.filter(t => t.name !== topic.name);
            console.log('Removed topic:', topic.name);
        }
    }

    function removeTopic(topic) {
      selectedTags = selectedTags.filter(t => t.name !== topic.name);
        console.log('Removed topic:', topic.name);
    }
    

    // tree data
    const treeData = {
      "name": "Computer Science",
      "subfields": [
        {
          "name": "Theoretical Computer Science",
          "subfields": [
            {
              "name": "Algorithms",
              "subfields": [
                { "name": "Graph Algorithms", "subfields": [] },
                { "name": "Randomized Algorithms", "subfields": [] },
                { "name": "Approximation Algorithms", "subfields": [] },
                { "name": "Parallel Algorithms", "subfields": [] }
              ]
            },
            {
              "name": "Formal Languages",
              "subfields": [
                { "name": "Regular Languages and Finite Automata", "subfields":[] },
                { "name": "Context-Free Languages and Grammars", "subfields":[] },
                { "name": "Context-Sensitive Languages", "subfields":[] },
                { "name": "Parsing and Syntax Analysis", "subfields":[] }
              ]
            },
            {
              "name": "Cryptography (Theoretical)",
              "subfields": [
                { "name": "Public-Key Cryptography", "subfields":[] },
                { "name": "Zero-Knowledge Proofs", "subfields":[] },
                { "name": "Lattice-Based Cryptography", "subfields":[] },
                { "name": "Provable Security", "subfields":[] }
              ]
            },
            {
              "name": "Quantum Computing Theory",
              "subfields": [
                { "name": "Quantum Algorithms", "subfields": [] },
                { "name": "Quantum Complexity Theory", "subfields": [] },
                { "name": "Quantum Error Correction", "subfields": [] },
                { "name": "Quantum Information Theory", "subfields": [] }
              ]
            },
            {
              "name": "Automata Theory",
              "subfields": [
                { "name": "Finite Automata", "subfields": [] },
                { "name": "Pushdown Automata", "subfields": [] },
                { "name": "Turing Machines", "subfields": [] },
                { "name": "Cellular Automata", "subfields": [] }
              ]
            }
          ]
        },
        {
        "name": "Computer Systems & Architecture",
        "subfields": [
          {
            "name": "Operating Systems",
            "subfields": [
              {
                "name": "Kernel Types",
                "subfields": [
                  { "name": "Monolithic", "subfields": [] },
                  { "name": "Microkernel", "subfields": [] },
                  { "name": "Hybrid", "subfields": [] }
                ]
              },
              {
                "name": "Memory Management",
                "subfields": [
                  { "name": "Paging", "subfields": [] },
                  { "name": "Segmentation", "subfields": [] },
                  { "name": "Garbage Collection", "subfields": [] }
                ]
              },
              {
                "name": "Process Management",
                "subfields": [
                  { "name": "Scheduling Algorithms", "subfields": [] },
                  { "name": "Concurrency Control", "subfields": [] },
                  { "name": "Interprocess Communication", "subfields": [] }
                ]
              },
              {
                "name": "File Systems",
                "subfields": [
                  { "name": "FAT", "subfields": [] },
                  { "name": "NTFS", "subfields": [] },
                  { "name": "Ext4", "subfields": [] }
                ]
              }
            ]
          },
          {
            "name": "Distributed Systems",
            "subfields": [
              {
                "name": "Consensus Algorithms",
                "subfields": [
                  { "name": "Raft", "subfields": [] },
                  { "name": "Paxos", "subfields": [] },
                  { "name": "Viewstamped Replication", "subfields": [] }
                ]
              },
              {
                "name": "Fault Tolerance",
                "subfields": [
                  { "name": "Replication Strategies", "subfields": [] },
                  { "name": "Failure Detection", "subfields": [] },
                  { "name": "Checkpointing", "subfields": [] }
                ]
              },
              {
                "name": "Distributed File Systems",
                "subfields": [
                  { "name": "Hadoop DFS", "subfields": [] },
                  { "name": "Google File System", "subfields": [] },
                  { "name": "Ceph", "subfields": [] }
                ]
              },
              {
                "name": "Peer-to-Peer Networks",
                "subfields": [
                  { "name": "BitTorrent", "subfields": [] },
                  { "name": "Gnutella", "subfields": [] },
                  { "name": "Kademlia", "subfields": [] }
                ]
              }
            ]
          },
          {
            "name": "Computer Hardware/Architectures",
            "subfields": [
              {
                "name": "Instruction Set Architectures (ISA)",
                "subfields": [
                  { "name": "x86", "subfields": [] },
                  { "name": "ARM", "subfields": [] },
                  { "name": "RISC-V", "subfields": [] }
                ]
              },
              {
                "name": "Cache Memory Hierarchies",
                "subfields": [
                  { "name": "Direct-Mapped", "subfields": [] },
                  { "name": "Associative", "subfields": [] },
                  { "name": "Set-Associative", "subfields": [] }
                ]
              },
              {
                "name": "Parallel and Distributed Processing",
                "subfields": [
                  { "name": "Flynn's Taxonomy", "subfields": [] },
                  { "name": "SIMD Architectures", "subfields": [] },
                  { "name": "MIMD Architectures", "subfields": [] }
                ]
              },
              {
                "name": "Embedded Systems Design",
                "subfields": [
                  { "name": "Real-Time Operating Systems", "subfields": [] },
                  { "name": "System-on-Chip (SoC)", "subfields": [] },
                  { "name": "FPGA-based Design", "subfields": [] }
                ]
              }
            ]
          }
        ]
      },
        {
          "name": "Artificial Intelligence & Machine Learning",
          "subfields": [
            {
              "name": "Neural Networks",
              "subfields": [
                { "name": "Convolutional Neural Networks (CNNs)", "subfields": [] },
                { "name": "Recurrent Neural Networks (RNNs)", "subfields": [] },
                { "name": "Generative Adversarial Networks (GANs)", "subfields": [] }
              ]
            },
            {
              "name": "Natural Language Processing (NLP)",
              "subfields": [
                { "name": "Sentiment Analysis", "subfields": [] },
                { "name": "Machine Translation", "subfields": [] },
                { "name": "Named Entity Recognition", "subfields": [] }
              ]
            },
            {
              "name": "Reinforcement Learning",
              "subfields": [
                { "name": "Q-Learning", "subfields": []},
                { "name": "Policy Gradient Methods", "subfields": []},
                { "name": "Deep Reinforcement Learning", "subfields": []}
              ]
            },
            {
              "name": "Computer Vision",
              "subfields": [
                { "name": "Image Classification", "subfields": []},
                { "name": "Object Detection", "subfields": []},
                { "name": "Image Segmentation", "subfields": []}
              ]
            },
            {
              "name": "Robotics",
              "subfields": [
                { "name": "Motion Planning", "subfields": []},
                { "name": "Robot Perception", "subfields": []},
                { "name": "Human-Robot Interaction", "subfields": []}
              ]
            }
          ]
        },
        {
          "name": "Software Engineering",
          "subfields": [
            {
              "name": "Software Design Patterns",
              "subfields": [
                { "name": "Creational Patterns", "subfields": [] },
                { "name": "Structural Patterns", "subfields": [] },
                { "name": "Behavioral Patterns", "subfields": [] }
              ]
            },
            {
              "name": "DevOps",
              "subfields": [
                { "name": "Continuous Integration", "subfields": [] },
                { "name": "Continuous Deployment", "subfields": [] },
                { "name": "Infrastructure as Code", "subfields": [] }
              ]
            },
            {
              "name": "Agile Methodology",
              "subfields": [
                { "name": "Scrum", "subfields": [] },
                { "name": "Kanban", "subfields": [] },
                { "name": "Extreme Programming", "subfields": [] }
              ]
            },
            {
              "name": "Quality Assurance",
              "subfields": [
                { "name": "Static Analysis", "subfields": [] },
                { "name": "Performance Testing", "subfields": [] },
                { "name": "Security Testing", "subfields": [] }
              ]
            },
            {
              "name": "Software Testing",
              "subfields": [
                { "name": "Unit Testing", "subfields": [] },
                { "name": "Integration Testing", "subfields": [] },
                { "name": "System Testing", "subfields": [] }
              ]
            }
          ]
        },
        {
          "name": "Data Science & Databases",
          "subfields": [
            {
              "name": "Database Systems",
              "subfields": [
                { "name": "Relational Databases", "subfields": [] },
                { "name": "NoSQL Databases", "subfields": [] },
                { "name": "Distributed Databases", "subfields": [] }
              ]
            },
            {
              "name": "Big Data Analytics",
              "subfields": [
                { "name": "MapReduce & Spark", "subfields": [] },
                { "name": "Data Warehousing", "subfields": [] },
                { "name": "Real-Time Analytics", "subfields": [] }
              ]
            },
            {
              "name": "Data Mining",
              "subfields": [
                { "name": "Clustering", "subfields": [] },
                { "name": "Classification", "subfields": [] },
                { "name": "Anomaly Detection", "subfields": [] }
              ]
            },
            {
              "name": "Information Retrieval",
              "subfields": [
                { "name": "Search Engine Algorithms", "subfields": [] },
                { "name": "Text Mining", "subfields": [] },
                { "name": "Relevance Ranking", "subfields": [] }
              ]
            },
            {
              "name": "Data Visualization",
              "subfields": [
                { "name": "Interactive Visualization", "subfields": [] },
                { "name": "Statistical Graphics", "subfields": [] },
                { "name": "Geospatial Visualization", "subfields": [] }
              ]
            }
          ]
        },
        {
          "name": "Networking & Communications",
          "subfields": [
            {
              "name": "Internet Protocols (TCP/IP)",
              "subfields": [
                { "name": "Routing Protocols", "subfields": [] },
                { "name": "Transport Protocols", "subfields": [] },
                { "name": "Application Layer Protocols", "subfields": [] }
              ]
            },
            {
              "name": "Cloud Computing",
              "subfields": [
                { "name": "Infrastructure as a Service (IaaS)", "subfields": [] },
                { "name": "Platform as a Service (PaaS)", "subfields": [] },
                { "name": "Software as a Service (SaaS)", "subfields": [] }
              ]
            },
            {
              "name": "Wireless Networks",
              "subfields": [
                { "name": "WiFi", "subfields": [] },
                { "name": "Cellular Networks", "subfields": [] },
                { "name": "Ad Hoc Networks", "subfields": [] }
              ]
            },
            {
              "name": "IoT Systems",
              "subfields": [
                { "name": "Edge Computing", "subfields": [] },
                { "name": "Sensor Networks", "subfields": [] },
                { "name": "IoT Protocols", "subfields": [] }
              ]
            },
            {
              "name": "Network Security",
              "subfields": [
                { "name": "Encryption Techniques", "subfields": [] },
                { "name": "Intrusion Detection Systems", "subfields": [] },
                { "name": "Firewall Technologies", "subfields": [] }
              ]
            }
          ]
        },
        {
          "name": "Cybersecurity & Privacy",
          "subfields": [
            {
              "name": "Applied Cryptography",
              "subfields": [
                { "name": "Symmetric Cryptography", "subfields": [] },
                { "name": "Asymmetric Cryptography", "subfields": [] },
                { "name": "Cryptographic Hash Functions", "subfields": [] }
              ]
            },
            {
              "name": "Ethical Hacking",
              "subfields": [
                { "name": "Penetration Testing", "subfields": [] },
                { "name": "Vulnerability Assessment", "subfields": [] },
                { "name": "Social Engineering", "subfields": [] }
              ]
            },
            {
              "name": "Digital Forensics",
              "subfields": [
                { "name": "Computer Forensics", "subfields": [] },
                { "name": "Network Forensics", "subfields": [] },
                { "name": "Mobile Device Forensics", "subfields": [] }
              ]
            },
            {
              "name": "Blockchain Security",
              "subfields": [
                { "name": "Smart Contract Auditing", "subfields": [] },
                { "name": "Consensus Mechanism Security", "subfields": [] },
                { "name": "Cryptocurrency Security", "subfields": [] }
              ]
            },
            {
              "name": "Privacy Engineering",
              "subfields": [
                { "name": "Data Anonymization", "subfields": [] },
                { "name": "Access Control Mechanisms", "subfields": [] },
                { "name": "Privacy by Design", "subfields": [] }
              ]
            }
          ]
        },
        {
          "name": "Human-Computer Interaction (HCI)",
          "subfields": [
            {
              "name": "UX/UI Design",
              "subfields": [
                { "name": "Interaction Design", "subfields": [] },
                { "name": "Visual Design", "subfields": [] },
                { "name": "Information Architecture", "subfields": [] }
              ]
            },
            {
              "name": "Accessibility",
              "subfields": [
                { "name": "Screen Readers", "subfields": [] },
                { "name": "Keyboard Navigation", "subfields": [] },
                { "name": "Assistive Technologies", "subfields": [] }
              ]
            },
            {
              "name": "Virtual Reality (VR)",
              "subfields": [
                { "name": "Immersive Environment Design", "subfields": [] },
                { "name": "VR Interaction Techniques", "subfields": [] },
                { "name": "Motion Tracking", "subfields": [] }
              ]
            },
            {
              "name": "Usability Testing",
              "subfields": [
                { "name": "User Interviews & Surveys", "subfields": [] },
                { "name": "A/B Testing", "subfields": [] },
                { "name": "Heuristic Evaluation", "subfields": [] }
              ]
            },
            {
              "name": "Augmented Reality (AR)",
              "subfields": [
                { "name": "Marker-Based AR", "subfields": [] },
                { "name": "Markerless AR", "subfields": [] },
                { "name": "Spatial Mapping", "subfields": [] }
              ]
            }
          ]
        },
        {
          "name": "Computer Graphics & Visualization",
          "subfields": [
            {
              "name": "3D Graphics Rendering",
              "subfields": [
                { "name": "Ray Tracing", "subfields": [] },
                { "name": "Rasterization", "subfields": [] },
                { "name": "Physically Based Rendering", "subfields": [] }
              ]
            },
            {
              "name": "Animation",
              "subfields": [
                { "name": "Keyframe Animation", "subfields": [] },
                { "name": "Procedural Animation", "subfields": [] },
                { "name": "Motion Capture", "subfields": [] }
              ]
            },
            {
              "name": "Scientific Visualization",
              "subfields": [
                { "name": "Volume Rendering", "subfields": [] },
                { "name": "Data Mapping", "subfields": [] },
                { "name": "Simulation Visualization", "subfields": [] }
              ]
            },
            {
              "name": "Game Engine Development",
              "subfields": [
                { "name": "Real-Time Rendering", "subfields": [] },
                { "name": "Physics Simulation", "subfields": [] },
                { "name": "Scripting and AI Integration", "subfields": [] }
              ]
            },
            {
              "name": "Geometric Modeling",
              "subfields": [
                { "name": "Mesh Generation", "subfields": [] },
                { "name": "Surface Reconstruction", "subfields": [] },
                { "name": "Parametric Modeling", "subfields": [] }
              ]
            }
          ]
        },
        {
          "name": "Programming Languages & Compilers",
          "subfields": [
            {
              "name": "Programming Language Theory",
              "subfields": [
                { "name": "Operational Semantics", "subfields": [] },
                { "name": "Denotational Semantics", "subfields": [] },
                { "name": "Axiomatic Semantics", "subfields": [] }
              ]
            },
            {
              "name": "Compiler Design",
              "subfields": [
                { "name": "Lexical Analysis", "subfields": [] },
                { "name": "Parsing Techniques", "subfields": [] },
                { "name": "Code Optimization", "subfields": [] }
              ]
            },
            {
              "name": "Type Systems",
              "subfields": [
                { "name": "Static Typing", "subfields": [] },
                { "name": "Dynamic Typing", "subfields": [] },
                { "name": "Type Inference", "subfields": [] }
              ]
            },
            {
              "name": "Concurrency Models",
              "subfields": [
                { "name": "Thread-based Concurrency", "subfields": [] },
                { "name": "Message Passing", "subfields": [] },
                { "name": "Actor Model", "subfields": [] }
              ]
            },
            {
              "name": "Functional Programming",
              "subfields": [
                { "name": "Immutable Data Structures", "subfields": [] },
                { "name": "Higher-Order Functions", "subfields": [] },
                { "name": "Lazy Evaluation", "subfields": [] }
              ]
            }
          ]
        }
      ]
    };

    let selectedNode = null;
    
    function handleSelect(event) {
      selectedNode = event.detail;
      console.log("Selected tag:", selectedNode.name);
    }

</script>
  
  <div id="registration">
    <div id="container">
      <!-- Sidebar -->
      <div id="sidebar">
        <h3>Creating Account</h3>
        
        <div class="progress-container">
          <div class="progress-item {currentStage === 1 ? 'current' : ''} {currentStage > 1 ? 'completed' : ''}">
            <span class="progress-number">1</span>
            <span>Personal Details</span>
          </div>
      
          <div class="progress-item {currentStage === 2 ? 'current' : ''} {currentStage > 2 ? 'completed' : ''}">
            <span class="progress-number">2</span>
            <span>Account Setup</span>
          </div>
      
          <div class="progress-item {currentStage === 3 ? 'current' : ''} {currentStage > 3 ? 'completed' : ''}">
            <span class="progress-number">3</span>
            <span>Selecting Tags</span>
          </div>
        </div>
      </div>
  
      <div id="form-content">
        {#if currentStage === 1}
          <h2>Step 1: Personal Details </h2>
          <form>
            <select id="selection" class="element" bind:value={profile}>
              <option value="" disabled selected>Select Tutor/Student</option>
              <option value="tutor">Tutor</option>
              <option value="tutee">Student</option>
            </select>
            <input class="element" type="text" bind:value={forename} placeholder="Forename" />
            <input class="element" type="text" bind:value={surname} placeholder="Surname" /> 
            <input class="element" type="text" bind:value={email} placeholder="Email" /> 
            <input class="element" type="text" bind:value={education} placeholder="Education" />
            <input class="element" type="number" bind:value={age} placeholder="Age" />
            <input class="element" type="text" bind:value={language} placeholder="Language" />
            <input class="element" type="text" bind:value={timezone} placeholder="Time Zone" />
            <button type="button" onclick={nextStage}>Next</button>
          </form>
        {/if}
  
        {#if currentStage === 2}
          <h2>Step 2: Account Setup</h2>
          <form>
            <div id="username">
              {#if username_validation}
                <input id="username_in" class="element" type="text" bind:value={username} placeholder="Username" readonly/>
                <button id="valid_username" type="button" onclick={valid_username}>Change</button>
                <span id="username_message" style="color:green;">Valid Username</span>
              {:else}
                <input id="username_in" class="element" type="text" bind:value={username} placeholder="Username" />
                <button id="valid_username" type="button" onclick={valid_username}>CHECK</button>
                <span id="username_message" style="color:red;">Invalid Username</span>
              {/if}
            </div>
            <div id="password" type= "text">
                <input class="element" name="password" id="password_in" type="password" placeholder="Password" bind:value={password} onkeyup={()=>{ pw_length_check(); pw_values_check(); pw_match_check();}} />
				        <span id='pw_length_message'></span>
                <span style="margin-left: 10px;" id='pw_values_message'></span>
			      </div>
			      <div id="password">
                <input class="element" type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password" bind:value={confirm_password} onkeyup={()=>{pw_match_check();}} /> 
                <span id='pw_match_message'></span>
            </div>
            <input class="element" type="file" id="profile-pic" accept="image/*" onchange={handle_profile_img}/>
            <textarea class="element" bind:value={description} placeholder="Description"></textarea>
            <button type="button" onclick={previousStage}>Back</button>
            <button type="button" onclick={nextStage}>Next</button>
          </form>
        {/if}

        {#if currentStage === 3}
          <h2>Step 3: Selecting Tags</h2>
          <form>
            <div class="tag-selection-container">
              <div class="tree-container">
                <h3>Topics</h3>
                <Tree 
                  data={treeData} 
                  {selectedTags}
                  on:topicOperation={handleTopicOperation} 
                />
              </div>
              
              <div class="selected-tags-container">
                <h3>Selected Topics ({selectedTags.length})</h3>
                {#if selectedTags.length === 0}
                  <p class="empty-selection">No topics selected. Click the "+" button next to a topic to add it. You can choose up to a maximum of 5 topics.</p>
                {:else}
                  <div class="selected-tags-list">
                    {#each selectedTags as topic}
                      <div class="selected-tag">
                        <span>{topic.name}</span>
                        <button type="button" class="remove-btn" onclick={() => removeTopic(topic)}>×</button>
                      </div>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
            
            <div class="nav-buttons">
              <button type="button" onclick={previousStage}>Back</button>
              <button type="button" class="submit-btn" onclick={finalStage} disabled={selectedTags.length === 0}>
                Submit
              </button>
            </div>
          </form>
        {/if}
    </div>
  </div>
</div>
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap');

    #registration {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      background-color: #f8f8f8;
      height: 90vh;
      padding: 20px;
    }

    #container {
      display: flex;
      flex-direction: column;
      width: 75%;
      max-width: 1200px;
      margin: auto;
      padding: 20px;
    }

    /* selecting student/tutor box  */
    #selection {
      cursor: pointer;
    }

    #form-content {
      width: 100%;
      max-width: 700px;
      padding: 20px;
      background-color: #ffffff;
      border: 1px solid #ccc;
      border-radius: 10px;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    }

    #username {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      margin-top: 20px;
    }

    #username_in {
      max-width: 550px;
    }

    #valid_username {
      max-width: 100px;
    }

    #password {
      display: flex;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
      margin-top: 10px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 13px;
    }

    .element {
      padding: 11px;
      border: 1px solid #aaa;
      font-size: 15px;
      border-radius: 5px;
    }

    h2 {
      font-family: 'Poppins', sans-serif;
      font-size: 23px;
      color: #333;
      margin-bottom: 15px;
    }

    h3 {
      font-family: 'Poppins', sans-serif;
      font-size: 20px;
      color: #333;
      margin-bottom: 15px;
    }

    button {
      padding: 12px;
      background-color: #d3d3d3;
      color: #333;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s ease, transform 0.1s ease;
    }

    button:hover {
      background-color: #b0b0b0;
      transform: scale(1.02);
    }

    /*for sidebar */
    #sidebar {
      width: 100%;
      max-width: 700px;
      padding: 20px;
      background-color: #ececec;
      color: black;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
      border: 1px solid #ccc;
      border-radius: 15px;
      margin-bottom: 20px;
      font-family: 'Poppins', sans-serif;
    }

    .progress-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      flex: 1;
      padding: 0 5px;
    }

    .progress-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin: 5px 0;
    }

    .progress-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      background-color: #ccc;
      color: white;
      border-radius: 50%;
      margin-bottom: 8px;
      font-weight: bold;
      position: relative;
    }

    .current .progress-number {
      background-color: rgb(46, 108, 174);
    }

    .completed .progress-number {
      background-color: rgb(76, 135, 76);
    }

    /* tags */
    .nav-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
    }

    .tag-selection-container {
      width: 685px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 20px;
      color: black;
    }

    .tree-container {
      width: 650px;
      border: 1px solid #e8e8e8;
      border-radius: 6px;
      padding: 15px;
      background-color: #fafafa;
      min-height: 400px;
      max-height: 500px;
      overflow-y: auto;
    }

    .selected-tags-container {
      width: 95%;
      border: 1px solid #e8e8e8;
      border-radius: 6px;
      padding: 15px;
      background-color: #fafafa;
      min-height: 200px;
      overflow-y: auto;
    }

    .selected-tags-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .selected-tag {
      display: flex;
      align-items: center;
      background-color: #e6f7ff;
      padding: 7px 12px;
      border-radius: 30px;
      font-size: 15px;
      border: 1px solid #91caff;
    }

    .empty-selection {
      color: grey;
      font-style: italic;
    }

    .remove-btn {
      background: none;
      color: red;
      cursor: pointer;
      font-size: 19px;
      font-weight: bold;
      margin: -5px -5px -5px 5px;
      height: 24px;
      width: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }

    .remove-btn:hover {
      background-color: rgba(255, 77, 79, 0.1);
    }

    .submit-btn {
      background-color: #95dc71;
    }

    .submit-btn:hover {
      background-color: #65ab45;
    }

  </style>