// IQ Test data with 80 questions covering verbal, mathematical, spatial, and logical reasoning

export const iqQuestions = [
  // Verbal Reasoning Questions (20 questions)
  {
    id: 1,
    question: "Which word is most similar to 'eloquent'?",
    options: ["Articulate", "Quiet", "Rude", "Simple"],
    correct: 0,
    explanation: "Both 'eloquent' and 'articulate' mean speaking clearly and effectively.",
    category: "verbal",
    difficulty: "medium"
  },
  {
    id: 2,
    question: "What is the opposite of 'benevolent'?",
    options: ["Kind", "Malicious", "Generous", "Helpful"],
    correct: 1,
    explanation: "'Benevolent' means kind and generous, so 'malicious' (evil-intentioned) is its opposite.",
    category: "verbal",
    difficulty: "medium"
  },
  {
    id: 3,
    question: "Complete the analogy: Book is to Library as Car is to:",
    options: ["Highway", "Garage", "Driver", "Engine"],
    correct: 1,
    explanation: "Books are stored in libraries, just as cars are stored in garages.",
    category: "verbal",
    difficulty: "easy"
  },
  {
    id: 4,
    question: "Which word does not belong: Apple, Orange, Banana, Chair?",
    options: ["Apple", "Orange", "Banana", "Chair"],
    correct: 3,
    explanation: "Apple, Orange, and Banana are all fruits, while Chair is furniture.",
    category: "verbal",
    difficulty: "easy"
  },
  {
    id: 5,
    question: "What is the meaning of 'ephemeral'?",
    options: ["Lasting forever", "Short-lived", "Very large", "Extremely small"],
    correct: 1,
    explanation: "'Ephemeral' means lasting for a very short time or fleeting.",
    category: "verbal",
    difficulty: "hard"
  },
  {
    id: 6,
    question: "Complete the sequence: Cat, Dog, Horse, ?",
    options: ["Lion", "Elephant", "Tiger", "Bird"],
    correct: 1,
    explanation: "The sequence follows increasing size: Cat (small), Dog (medium), Horse (large), Elephant (largest).",
    category: "verbal",
    difficulty: "medium"
  },
  {
    id: 7,
    question: "Which word is most similar to 'meticulous'?",
    options: ["Careless", "Thorough", "Quick", "Rough"],
    correct: 1,
    explanation: "'Meticulous' means showing great attention to detail, which is similar to 'thorough'.",
    category: "verbal",
    difficulty: "medium"
  },
  {
    id: 8,
    question: "What is the opposite of 'verbose'?",
    options: ["Talkative", "Concise", "Loud", "Quiet"],
    correct: 1,
    explanation: "'Verbose' means using more words than necessary, so 'concise' (brief and clear) is its opposite.",
    category: "verbal",
    difficulty: "medium"
  },
  {
    id: 9,
    question: "Complete the analogy: Doctor is to Patient as Teacher is to:",
    options: ["Classroom", "Student", "School", "Book"],
    correct: 1,
    explanation: "Doctors treat patients, just as teachers educate students.",
    category: "verbal",
    difficulty: "easy"
  },
  {
    id: 10,
    question: "Which word does not belong: Happy, Sad, Angry, Chair?",
    options: ["Happy", "Sad", "Angry", "Chair"],
    correct: 3,
    explanation: "Happy, Sad, and Angry are all emotions, while Chair is furniture.",
    category: "verbal",
    difficulty: "easy"
  },
  {
    id: 11,
    question: "What is the meaning of 'ubiquitous'?",
    options: ["Rare", "Present everywhere", "Very large", "Invisible"],
    correct: 1,
    explanation: "'Ubiquitous' means present, appearing, or found everywhere.",
    category: "verbal",
    difficulty: "hard"
  },
  {
    id: 12,
    question: "Complete the sequence: Monday, Tuesday, Wednesday, ?",
    options: ["Friday", "Thursday", "Saturday", "Sunday"],
    correct: 1,
    explanation: "This follows the days of the week in order: Monday, Tuesday, Wednesday, Thursday.",
    category: "verbal",
    difficulty: "easy"
  },
  {
    id: 13,
    question: "Which word is most similar to 'arduous'?",
    options: ["Easy", "Difficult", "Quick", "Short"],
    correct: 1,
    explanation: "'Arduous' means involving or requiring strenuous effort, which is similar to 'difficult'.",
    category: "verbal",
    difficulty: "medium"
  },
  {
    id: 14,
    question: "What is the opposite of 'transparent'?",
    options: ["Clear", "Opaque", "Thin", "Light"],
    correct: 1,
    explanation: "'Transparent' means see-through or clear, so 'opaque' (not transparent) is its opposite.",
    category: "verbal",
    difficulty: "medium"
  },
  {
    id: 15,
    question: "Complete the analogy: Hammer is to Nail as Scissors are to:",
    options: ["Paper", "Cut", "Sharp", "Metal"],
    correct: 0,
    explanation: "Hammers are used with nails, just as scissors are used with paper.",
    category: "verbal",
    difficulty: "easy"
  },
  {
    id: 16,
    question: "Which word does not belong: Red, Blue, Green, Piano?",
    options: ["Red", "Blue", "Green", "Piano"],
    correct: 3,
    explanation: "Red, Blue, and Green are all colors, while Piano is a musical instrument.",
    category: "verbal",
    difficulty: "easy"
  },
  {
    id: 17,
    question: "What is the meaning of 'paradox'?",
    options: ["A contradiction", "A simple truth", "A question", "An answer"],
    correct: 0,
    explanation: "A paradox is a statement that contradicts itself or leads to a situation that defies intuition.",
    category: "verbal",
    difficulty: "hard"
  },
  {
    id: 18,
    question: "Complete the sequence: Spring, Summer, Autumn, ?",
    options: ["Winter", "Rain", "Sun", "Cold"],
    correct: 0,
    explanation: "This follows the four seasons in order: Spring, Summer, Autumn, Winter.",
    category: "verbal",
    difficulty: "easy"
  },
  {
    id: 19,
    question: "Which word is most similar to 'cryptic'?",
    options: ["Clear", "Mysterious", "Loud", "Bright"],
    correct: 1,
    explanation: "'Cryptic' means having a meaning that is mysterious or obscure, similar to 'mysterious'.",
    category: "verbal",
    difficulty: "medium"
  },
  {
    id: 20,
    question: "What is the opposite of 'diminish'?",
    options: ["Shrink", "Increase", "Hide", "Show"],
    correct: 1,
    explanation: "'Diminish' means to make or become less, so 'increase' (to make or become greater) is its opposite.",
    category: "verbal",
    difficulty: "medium"
  },

  // Mathematical Reasoning Questions (20 questions)
  {
    id: 21,
    question: "What is 15% of 200?",
    options: ["25", "30", "35", "40"],
    correct: 1,
    explanation: "15% of 200 = 0.15 × 200 = 30.",
    category: "mathematical",
    difficulty: "easy"
  },
  {
    id: 22,
    question: "If a train travels 60 miles in 1 hour, how far will it travel in 3 hours?",
    options: ["120 miles", "150 miles", "180 miles", "200 miles"],
    correct: 2,
    explanation: "Distance = Speed × Time = 60 mph × 3 hours = 180 miles.",
    category: "mathematical",
    difficulty: "easy"
  },
  {
    id: 23,
    question: "What is the next number in the sequence: 2, 4, 8, 16, ?",
    options: ["20", "24", "32", "64"],
    correct: 2,
    explanation: "This is a geometric sequence where each number is multiplied by 2: 2×2=4, 4×2=8, 8×2=16, 16×2=32.",
    category: "mathematical",
    difficulty: "medium"
  },
  {
    id: 24,
    question: "If 3x + 7 = 22, what is x?",
    options: ["3", "4", "5", "6"],
    correct: 2,
    explanation: "Solve: 3x + 7 = 22 → 3x = 15 → x = 5.",
    category: "mathematical",
    difficulty: "medium"
  },
  {
    id: 25,
    question: "What is 1/4 + 1/4?",
    options: ["1/8", "1/2", "2/4", "1/4"],
    correct: 1,
    explanation: "1/4 + 1/4 = 2/4 = 1/2.",
    category: "mathematical",
    difficulty: "easy"
  },
  {
    id: 26,
    question: "If a rectangle has length 8 and width 5, what is its area?",
    options: ["26", "40", "13", "45"],
    correct: 1,
    explanation: "Area of rectangle = length × width = 8 × 5 = 40.",
    category: "mathematical",
    difficulty: "easy"
  },
  {
    id: 27,
    question: "What is the next number in the sequence: 1, 1, 2, 3, 5, 8, ?",
    options: ["11", "12", "13", "21"],
    correct: 2,
    explanation: "This is the Fibonacci sequence where each number is the sum of the two preceding ones: 5 + 8 = 13.",
    category: "mathematical",
    difficulty: "medium"
  },
  {
    id: 28,
    question: "If 2y - 5 = 11, what is y?",
    options: ["6", "7", "8", "9"],
    correct: 2,
    explanation: "Solve: 2y - 5 = 11 → 2y = 16 → y = 8.",
    category: "mathematical",
    difficulty: "medium"
  },
  {
    id: 29,
    question: "What is 25% of 80?",
    options: ["15", "20", "25", "30"],
    correct: 1,
    explanation: "25% of 80 = 0.25 × 80 = 20.",
    category: "mathematical",
    difficulty: "easy"
  },
  {
    id: 30,
    question: "If a circle has radius 7, what is its diameter?",
    options: ["14", "21", "28", "49"],
    correct: 0,
    explanation: "Diameter = 2 × radius = 2 × 7 = 14.",
    category: "mathematical",
    difficulty: "easy"
  },
  {
    id: 31,
    question: "What is the next number in the sequence: 10, 20, 40, 80, ?",
    options: ["120", "140", "160", "200"],
    correct: 2,
    explanation: "This is a geometric sequence where each number is multiplied by 2: 10×2=20, 20×2=40, 40×2=80, 80×2=160.",
    category: "mathematical",
    difficulty: "medium"
  },
  {
    id: 32,
    question: "If x² = 25, what is x?",
    options: ["4", "5", "6", "7"],
    correct: 1,
    explanation: "x² = 25 → x = ±5, but since 5 is the only positive option, x = 5.",
    category: "mathematical",
    difficulty: "medium"
  },
  {
    id: 33,
    question: "What is 3/5 as a percentage?",
    options: ["35%", "50%", "60%", "65%"],
    correct: 2,
    explanation: "3/5 = 0.6 = 60%.",
    category: "mathematical",
    difficulty: "easy"
  },
  {
    id: 34,
    question: "If a triangle has base 10 and height 6, what is its area?",
    options: ["16", "30", "60", "32"],
    correct: 1,
    explanation: "Area of triangle = (1/2) × base × height = (1/2) × 10 × 6 = 30.",
    category: "mathematical",
    difficulty: "easy"
  },
  {
    id: 35,
    question: "What is the next number in the sequence: 1, 4, 9, 16, 25, ?",
    options: ["30", "35", "36", "49"],
    correct: 2,
    category: "mathematical",
    difficulty: "medium"
  },
  {
    id: 36,
    question: "If 4a + 12 = 36, what is a?",
    options: ["4", "5", "6", "7"],
    correct: 2,
    category: "mathematical",
    difficulty: "medium"
  },
  {
    id: 37,
    question: "What is 0.5 × 0.4?",
    options: ["0.02", "0.2", "0.9", "2.0"],
    correct: 1,
    category: "mathematical",
    difficulty: "easy"
  },
  {
    id: 38,
    question: "If a square has side length 6, what is its perimeter?",
    options: ["24", "30", "36", "42"],
    correct: 0,
    explanation: "Perimeter of square = 4 × side length = 4 × 6 = 24.",
    category: "mathematical",
    difficulty: "easy"
  },
  {
    id: 39,
    question: "What is the next number in the sequence: 2, 6, 18, 54, ?",
    options: ["108", "162", "216", "324"],
    correct: 1,
    explanation: "This is a geometric sequence where each number is multiplied by 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162.",
    category: "mathematical",
    difficulty: "hard"
  },
  {
    id: 40,
    question: "If √x = 9, what is x?",
    options: ["3", "9", "81", "729"],
    correct: 2,
    explanation: "If √x = 9, then x = 9² = 81.",
    category: "mathematical",
    difficulty: "medium"
  },

  // Spatial Reasoning Questions (20 questions)
  {
    id: 41,
    question: "If you fold a square piece of paper in half twice, how many equal sections do you have?",
    options: ["2", "4", "6", "8"],
    correct: 1,
    explanation: "First fold creates 2 sections, second fold creates 4 equal sections.",
    category: "spatial",
    difficulty: "easy"
  },
  {
    id: 42,
    question: "Which shape has the most sides: triangle, square, pentagon, or hexagon?",
    options: ["Triangle", "Square", "Pentagon", "Hexagon"],
    correct: 3,
    explanation: "Triangle has 3 sides, square has 4, pentagon has 5, hexagon has 6 sides.",
    category: "spatial",
    difficulty: "easy"
  },
  {
    id: 43,
    question: "If you rotate a rectangle 90 degrees clockwise, what shape do you get?",
    options: ["A different rectangle", "A square", "A triangle", "A circle"],
    correct: 0,
    explanation: "Rotating a rectangle 90 degrees changes its orientation but it remains a rectangle with the same dimensions.",
    category: "spatial",
    difficulty: "medium"
  },
  {
    id: 44,
    question: "How many faces does a cube have?",
    options: ["4", "6", "8", "12"],
    correct: 1,
    explanation: "A cube has 6 faces: top, bottom, left, right, front, and back.",
    category: "spatial",
    difficulty: "easy"
  },
  {
    id: 45,
    question: "If you cut a cube in half, what shape is the cross-section?",
    options: ["Circle", "Square", "Triangle", "Rectangle"],
    correct: 1,
    category: "spatial",
    difficulty: "medium"
  },
  {
    id: 46,
    question: "Which direction is opposite to Northeast?",
    options: ["Northwest", "Southeast", "Southwest", "East"],
    correct: 2,
    category: "spatial",
    difficulty: "medium"
  },
  {
    id: 47,
    question: "If you have a clock showing 3:00 and you rotate it 180 degrees, what time does it show?",
    options: ["6:00", "9:00", "12:00", "3:00"],
    correct: 1,
    category: "spatial",
    difficulty: "medium"
  },
  {
    id: 48,
    question: "How many edges does a triangular prism have?",
    options: ["6", "9", "12", "15"],
    correct: 1,
    explanation: "A triangular prism has 3 edges on each triangular face (6 total) plus 3 vertical edges connecting the faces, totaling 9 edges.",
    category: "spatial",
    difficulty: "hard"
  },
  {
    id: 49,
    question: "If you fold a piece of paper with a dot on it in half, how many dots will you see?",
    options: ["0", "1", "2", "4"],
    correct: 1,
    explanation: "When you fold paper in half, you still see the same dot, just in a different position.",
    category: "spatial",
    difficulty: "easy"
  },
  {
    id: 50,
    question: "Which shape can tessellate (fit together without gaps): square, circle, or triangle?",
    options: ["Square only", "Circle only", "Triangle only", "Square and Triangle"],
    correct: 3,
    explanation: "Both squares and triangles can tessellate (fit together without gaps), but circles cannot because they leave gaps.",
    category: "spatial",
    difficulty: "medium"
  },
  {
    id: 51,
    question: "If you mirror the letter 'b', what letter do you get?",
    options: ["d", "p", "q", "b"],
    correct: 2,
    explanation: "When you horizontally mirror the letter 'b', it becomes 'q' because the curved part flips to the other side.",
    category: "spatial",
    difficulty: "easy"
  },
  {
    id: 52,
    question: "How many vertices (corners) does a pyramid with a square base have?",
    options: ["4", "5", "8", "9"],
    correct: 1,
    explanation: "A square pyramid has 4 vertices on the square base plus 1 apex vertex, totaling 5 vertices.",
    category: "spatial",
    difficulty: "medium"
  },
  {
    id: 53,
    question: "If you look at your reflection in a mirror, which hand appears to be your right hand?",
    options: ["Your left hand", "Your right hand", "Neither", "Both"],
    correct: 0,
    explanation: "In a mirror, left and right are swapped, so your actual left hand appears to be your right hand in the reflection.",
    category: "spatial",
    difficulty: "medium"
  },
  {
    id: 54,
    question: "Which shape has rotational symmetry of order 4: square, rectangle, or triangle?",
    options: ["Square", "Rectangle", "Triangle", "None"],
    correct: 0,
    explanation: "A square has rotational symmetry of order 4 because it looks the same when rotated 90°, 180°, 270°, or 360°.",
    category: "spatial",
    difficulty: "hard"
  },
  {
    id: 55,
    question: "If you have a net of a cube, how many squares are in the net?",
    options: ["4", "6", "8", "12"],
    correct: 1,
    explanation: "A cube has 6 faces, so its net (unfolded version) contains 6 squares.",
    category: "spatial",
    difficulty: "medium"
  },
  {
    id: 56,
    question: "Which direction is between North and East?",
    options: ["Northeast", "Northwest", "Southeast", "Southwest"],
    correct: 0,
    explanation: "Northeast is the direction that is halfway between North and East.",
    category: "spatial",
    difficulty: "easy"
  },
  {
    id: 57,
    question: "If you fold a square in half diagonally, what shape do you get?",
    options: ["Rectangle", "Triangle", "Diamond", "Circle"],
    correct: 1,
    explanation: "Folding a square diagonally creates a right triangle.",
    category: "spatial",
    difficulty: "easy"
  },
  {
    id: 58,
    question: "How many sides does a regular pentagon have?",
    options: ["3", "4", "5", "6"],
    correct: 2,
    explanation: "A pentagon has 5 sides (penta = five).",
    category: "spatial",
    difficulty: "easy"
  },
  {
    id: 59,
    question: "If you rotate the letter 'N' 180 degrees, what letter do you get?",
    options: ["N", "Z", "M", "W"],
    correct: 1,
    explanation: "Rotating the letter 'N' 180 degrees creates the letter 'Z'.",
    category: "spatial",
    difficulty: "medium"
  },
  {
    id: 60,
    question: "Which shape has the most lines of symmetry: circle, square, or triangle?",
    options: ["Circle", "Square", "Triangle", "All equal"],
    correct: 0,
    explanation: "A circle has infinite lines of symmetry (any diameter is a line of symmetry), while a square has 4 lines of symmetry and a triangle has 3 lines of symmetry (if equilateral).",
    category: "spatial",
    difficulty: "medium"
  },

  // Logical Reasoning Questions (20 questions)
  {
    id: 61,
    question: "All birds have wings. A penguin is a bird. Therefore, a penguin:",
    options: ["Can fly", "Has wings", "Can swim", "Lays eggs"],
    correct: 1,
    explanation: "This follows logical deduction: if all birds have wings, and penguins are birds, then penguins must have wings.",
    category: "logical",
    difficulty: "easy"
  },
  {
    id: 62,
    question: "If some cats are black and all black things are dark, then some cats are:",
    options: ["White", "Dark", "Large", "Small"],
    correct: 1,
    explanation: "If some cats are black, and all black things are dark, then those black cats must be dark.",
    category: "logical",
    difficulty: "medium"
  },
  {
    id: 63,
    question: "If A is greater than B, and B is greater than C, then A is:",
    options: ["Less than C", "Equal to C", "Greater than C", "Cannot be determined"],
    correct: 2,
    explanation: "This follows the transitive property: if A > B and B > C, then A > C.",
    category: "logical",
    difficulty: "easy"
  },
  {
    id: 64,
    question: "If today is Wednesday, what day was yesterday?",
    options: ["Monday", "Tuesday", "Thursday", "Friday"],
    correct: 1,
    explanation: "If today is Wednesday, then yesterday was Tuesday.",
    category: "logical",
    difficulty: "easy"
  },
  {
    id: 65,
    question: "If all roses are flowers and some flowers are red, then some roses are:",
    options: ["Red", "White", "Blue", "Cannot be determined"],
    correct: 3,
    explanation: "We know all roses are flowers and some flowers are red, but we cannot determine if any roses are red without additional information.",
    category: "logical",
    difficulty: "hard"
  },
  {
    id: 66,
    question: "If you're facing North and turn right, then left, then right again, which direction are you facing?",
    options: ["North", "South", "East", "West"],
    correct: 2,
    explanation: "North → right (East) → left (North) → right (East). You end up facing East.",
    category: "logical",
    difficulty: "medium"
  },
  {
    id: 67,
    question: "If no birds are mammals and all eagles are birds, then no eagles are:",
    options: ["Birds", "Mammals", "Animals", "Reptiles"],
    correct: 1,
    explanation: "If no birds are mammals and all eagles are birds, then no eagles are mammals.",
    category: "logical",
    difficulty: "medium"
  },
  {
    id: 68,
    question: "If 5 machines make 5 widgets in 5 minutes, how many machines are needed to make 100 widgets in 100 minutes?",
    options: ["1", "5", "10", "20"],
    correct: 1,
    explanation: "Each machine makes 1 widget in 5 minutes, so in 100 minutes each machine makes 20 widgets. To make 100 widgets, you need 5 machines.",
    category: "logical",
    difficulty: "hard"
  },
  {
    id: 69,
    question: "If A = B and B = C, then A = C. This is an example of:",
    options: ["Deduction", "Induction", "Transitive property", "Reflexive property"],
    correct: 2,
    explanation: "The transitive property states that if A relates to B and B relates to C, then A relates to C. This is fundamental to logical reasoning.",
    category: "logical",
    difficulty: "medium"
  },
  {
    id: 70,
    question: "If you have 12 coins and one is counterfeit (heavier), how many weighings are needed to find it using a balance scale?",
    options: ["2", "3", "4", "5"],
    correct: 1,
    explanation: "Using a balance scale, you can find the counterfeit coin in 3 weighings by dividing the coins into groups and comparing.",
    category: "logical",
    difficulty: "hard"
  },
  {
    id: 71,
    question: "If all squares are rectangles and some rectangles are red, then some squares are:",
    options: ["Red", "Blue", "Large", "Cannot be determined"],
    correct: 3,
    explanation: "We know all squares are rectangles and some rectangles are red, but we cannot determine if any squares are red without additional information.",
    category: "logical",
    difficulty: "hard"
  },
  {
    id: 72,
    question: "If it's raining and you don't have an umbrella, what's the logical conclusion?",
    options: ["You'll get wet", "You won't go outside", "You'll find shelter", "All of the above"],
    correct: 0,
    explanation: "If it's raining and you don't have an umbrella, the most direct logical conclusion is that you'll get wet.",
    category: "logical",
    difficulty: "easy"
  },
  {
    id: 73,
    question: "If every third person in line gets a prize, and you're 15th in line, will you get a prize?",
    options: ["Yes", "No", "Maybe", "Cannot be determined"],
    correct: 0,
    explanation: "Every third person means positions 3, 6, 9, 12, 15, 18... Since you're 15th, you will get a prize.",
    category: "logical",
    difficulty: "medium"
  },
  {
    id: 74,
    question: "If A implies B, and B implies C, then A implies:",
    options: ["Not C", "C", "B only", "Cannot be determined"],
    correct: 1,
    explanation: "This follows the transitive property of logical implication: if A → B and B → C, then A → C.",
    category: "logical",
    difficulty: "medium"
  },
  {
    id: 75,
    question: "If you have a 3-gallon and 5-gallon jug, how can you measure exactly 4 gallons?",
    options: ["Fill 3, pour into 5, fill 3 again", "Fill 5, pour into 3, empty 3", "Both methods work", "Neither method works"],
    correct: 2,
    explanation: "Both methods work: Method 1 - Fill 3, pour into 5, fill 3 again gives you 1 gallon left in 3-gallon jug; Method 2 - Fill 5, pour into 3, empty 3, then pour remaining 2 gallons from 5-gallon jug into empty 3-gallon jug, then fill 5-gallon jug again and pour 1 gallon into 3-gallon jug, leaving exactly 4 gallons in the 5-gallon jug.",
    category: "logical",
    difficulty: "hard"
  },
  {
    id: 76,
    question: "If all students are people and some people are teachers, then some students are:",
    options: ["Teachers", "Adults", "Children", "Cannot be determined"],
    correct: 3,
    category: "logical",
    difficulty: "hard"
  },
  {
    id: 77,
    question: "If you flip a coin 3 times, what's the probability of getting exactly 2 heads?",
    options: ["1/4", "1/2", "3/8", "3/4"],
    correct: 2,
    category: "logical",
    difficulty: "hard"
  },
  {
    id: 78,
    question: "If A is not equal to B, and B is not equal to C, then A is:",
    options: ["Equal to C", "Not equal to C", "Cannot be determined", "Both possible"],
    correct: 2,
    category: "logical",
    difficulty: "medium"
  },
  {
    id: 79,
    question: "If you have 8 balls and one is heavier, how many weighings are needed to find it?",
    options: ["2", "3", "4", "5"],
    correct: 1,
    explanation: "Using a balance scale, you can find the heavier ball among 8 in 3 weighings by dividing into groups and comparing.",
    category: "logical",
    difficulty: "medium"
  },
  {
    id: 80,
    question: "If all doctors are smart and some smart people are successful, then some doctors are:",
    options: ["Successful", "Teachers", "Students", "Cannot be determined"],
    correct: 3,
    explanation: "We know all doctors are smart and some smart people are successful, but we cannot determine if any doctors are successful without additional information.",
    category: "logical",
    difficulty: "hard"
  }
]

// Get random IQ questions for the test
export const getRandomIQQuestions = (count = 15) => {
  // Balanced difficulty distribution for accurate IQ measurement
  // 6 easy (40%), 6 medium (40%), 3 hard (20%) - total 15 questions
  const easyQuestions = iqQuestions.filter(q => q.difficulty === 'easy')
  const mediumQuestions = iqQuestions.filter(q => q.difficulty === 'medium')
  const hardQuestions = iqQuestions.filter(q => q.difficulty === 'hard')
  
  // Fisher-Yates shuffle function
  const shuffle = (array: any[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }
  
  // Select balanced questions
  const selectedEasy = shuffle(easyQuestions).slice(0, 6)
  const selectedMedium = shuffle(mediumQuestions).slice(0, 6)
  const selectedHard = shuffle(hardQuestions).slice(0, 3)
  
  // Combine and shuffle the final selection
  const selectedQuestions = shuffle([...selectedEasy, ...selectedMedium, ...selectedHard])
  
  // Shuffle options for each selected question and update correct answer index
  return selectedQuestions.map((question, index) => {
    const originalOptions = [...question.options]
    const correctAnswer = originalOptions[question.correct]
    
    // Create properly shuffled options array using Fisher-Yates
    const shuffledOptions = [...originalOptions]
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]]
    }
    
    // Find new index of correct answer
    const newCorrectIndex = shuffledOptions.indexOf(correctAnswer)
    
    return {
      ...question,
      id: index + 1, // Reassign IDs for the selected questions
      options: shuffledOptions,
      correct: newCorrectIndex // Update correct answer index to match new position
    }
  })
}

// Calculate IQ score based on answers
export const calculateIQScore = (answers: Record<number, number>, questions: any[]) => {
  let correctAnswers = 0
  let totalQuestions = questions.length
  
  questions.forEach((question) => {
    const userAnswer = answers[question.id]
    if (userAnswer !== undefined && userAnswer === question.correct) {
      correctAnswers++
    }
  })
  
  const accuracy = Math.round(((correctAnswers / totalQuestions) * 100) * 10) / 10
  
  // Convert accuracy to IQ score (simplified scale)
  let iqScore = 0
  if (accuracy >= 90) iqScore = 130 + Math.floor((accuracy - 90) * 2) // 130-150
  else if (accuracy >= 80) iqScore = 115 + Math.floor((accuracy - 80) * 1.5) // 115-130
  else if (accuracy >= 70) iqScore = 100 + Math.floor((accuracy - 70) * 1.5) // 100-115
  else if (accuracy >= 60) iqScore = 85 + Math.floor((accuracy - 60) * 1.5) // 85-100
  else if (accuracy >= 50) iqScore = 70 + Math.floor((accuracy - 50) * 1.5) // 70-85
  else iqScore = Math.max(60, 70 - Math.floor((50 - accuracy) * 0.5)) // 60-70
  
  // Cap at reasonable limits
  iqScore = Math.min(Math.max(iqScore, 60), 150)
  
  return {
    iqScore,
    accuracy,
    correctAnswers,
    totalQuestions,
    level: getIQLevel(iqScore),
    description: getIQDescription(iqScore)
  }
}

// Get IQ level based on score
const getIQLevel = (score: number) => {
  if (score >= 130) return "Very Superior"
  if (score >= 115) return "Superior"
  if (score >= 100) return "High Average"
  if (score >= 85) return "Average"
  if (score >= 70) return "Low Average"
  return "Below Average"
}

// Get IQ description
const getIQDescription = (score: number) => {
  if (score >= 130) return "Your IQ score indicates very superior intellectual functioning with exceptional reasoning abilities. You demonstrate outstanding cognitive performance across multiple domains including analytical thinking, problem-solving, and abstract reasoning. This level of intellectual ability places you in the top percentile and suggests exceptional potential for complex intellectual tasks."
  if (score >= 115) return "Your IQ score shows superior intellectual abilities with strong analytical thinking skills. You possess above-average cognitive capabilities that enable you to excel in complex reasoning tasks and problem-solving situations. Your intellectual strengths provide a solid foundation for academic and professional success in demanding fields."
  if (score >= 100) return "Your IQ score reflects high average intellectual functioning with good problem-solving abilities. You demonstrate solid cognitive performance across various reasoning domains with the capacity to handle moderately complex intellectual challenges. This level of intellectual ability supports effective learning and adaptation in most academic and professional settings."
  if (score >= 85) return "Your IQ score indicates average intellectual functioning with solid reasoning capabilities. You possess the cognitive skills necessary for everyday problem-solving and learning tasks. While there may be room for growth in certain areas, your intellectual abilities provide a stable foundation for personal and professional development."
  if (score >= 70) return "Your IQ score shows low average intellectual functioning with room for improvement. You demonstrate basic cognitive abilities that can be enhanced through focused practice and targeted skill development. With dedication and appropriate support, you can strengthen your reasoning capabilities and improve your intellectual performance."
  return "Your IQ score indicates below average intellectual functioning that may benefit from focused practice. While cognitive abilities can vary significantly, consistent practice and targeted skill development can help improve reasoning capabilities. Consider seeking additional support and engaging in activities that challenge different aspects of intellectual functioning."
}
