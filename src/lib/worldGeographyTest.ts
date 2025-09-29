interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
}

// World Geography Test Questions (150 questions)
const worldGeographyQuestions: Question[] = [
  // Countries & Capitals (40 questions)
  {
    id: 1,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correct: 2,
    category: "Countries & Capitals"
  },
  {
    id: 2,
    question: "What is the capital of Brazil?",
    options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
    correct: 2,
    category: "Countries & Capitals"
  },
  {
    id: 3,
    question: "What is the capital of Canada?",
    options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
    correct: 2,
    category: "Countries & Capitals"
  },
  {
    id: 4,
    question: "What is the capital of Japan?",
    options: ["Osaka", "Kyoto", "Tokyo", "Hiroshima"],
    correct: 2,
    category: "Countries & Capitals"
  },
  {
    id: 5,
    question: "What is the capital of South Africa?",
    options: ["Cape Town", "Johannesburg", "Pretoria", "Durban"],
    correct: 2,
    category: "Countries & Capitals"
  },
  {
    id: 6,
    question: "What is the capital of India?",
    options: ["Mumbai", "Kolkata", "New Delhi", "Bangalore"],
    correct: 2,
    category: "Countries & Capitals"
  },
  {
    id: 7,
    question: "What is the capital of Russia?",
    options: ["St. Petersburg", "Moscow", "Novosibirsk", "Yekaterinburg"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 8,
    question: "What is the capital of Egypt?",
    options: ["Alexandria", "Cairo", "Luxor", "Aswan"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 9,
    question: "What is the capital of Argentina?",
    options: ["Córdoba", "Rosario", "Buenos Aires", "Mendoza"],
    correct: 2,
    category: "Countries & Capitals"
  },
  {
    id: 10,
    question: "What is the capital of Thailand?",
    options: ["Chiang Mai", "Bangkok", "Phuket", "Pattaya"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 11,
    question: "What is the capital of Spain?",
    options: ["Barcelona", "Madrid", "Seville", "Valencia"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 12,
    question: "What is the capital of Italy?",
    options: ["Milan", "Rome", "Naples", "Florence"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 13,
    question: "What is the capital of Germany?",
    options: ["Munich", "Berlin", "Hamburg", "Frankfurt"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 14,
    question: "What is the capital of France?",
    options: ["Lyon", "Paris", "Marseille", "Toulouse"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 15,
    question: "What is the capital of United Kingdom?",
    options: ["Manchester", "London", "Birmingham", "Liverpool"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 16,
    question: "What is the capital of China?",
    options: ["Shanghai", "Beijing", "Guangzhou", "Shenzhen"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 17,
    question: "What is the capital of Mexico?",
    options: ["Guadalajara", "Mexico City", "Monterrey", "Puebla"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 18,
    question: "What is the capital of South Korea?",
    options: ["Busan", "Seoul", "Incheon", "Daegu"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 19,
    question: "What is the capital of Turkey?",
    options: ["Istanbul", "Ankara", "Izmir", "Antalya"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 20,
    question: "What is the capital of Indonesia?",
    options: ["Surabaya", "Jakarta", "Bandung", "Medan"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 21,
    question: "What is the capital of Nigeria?",
    options: ["Lagos", "Abuja", "Kano", "Ibadan"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 22,
    question: "What is the capital of Pakistan?",
    options: ["Karachi", "Islamabad", "Lahore", "Faisalabad"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 23,
    question: "What is the capital of Bangladesh?",
    options: ["Chittagong", "Dhaka", "Sylhet", "Rajshahi"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 24,
    question: "What is the capital of Vietnam?",
    options: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Hai Phong"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 25,
    question: "What is the capital of Philippines?",
    options: ["Cebu", "Manila", "Davao", "Quezon City"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 26,
    question: "What is the capital of Poland?",
    options: ["Krakow", "Warsaw", "Gdansk", "Wroclaw"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 27,
    question: "What is the capital of Netherlands?",
    options: ["Rotterdam", "Amsterdam", "The Hague", "Utrecht"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 28,
    question: "What is the capital of Belgium?",
    options: ["Antwerp", "Brussels", "Ghent", "Bruges"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 29,
    question: "What is the capital of Sweden?",
    options: ["Gothenburg", "Stockholm", "Malmo", "Uppsala"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 30,
    question: "What is the capital of Norway?",
    options: ["Bergen", "Oslo", "Trondheim", "Stavanger"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 31,
    question: "What is the capital of Denmark?",
    options: ["Aarhus", "Copenhagen", "Odense", "Aalborg"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 32,
    question: "What is the capital of Finland?",
    options: ["Tampere", "Helsinki", "Turku", "Oulu"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 33,
    question: "What is the capital of Switzerland?",
    options: ["Zurich", "Bern", "Geneva", "Basel"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 34,
    question: "What is the capital of Austria?",
    options: ["Salzburg", "Vienna", "Graz", "Innsbruck"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 35,
    question: "What is the capital of Greece?",
    options: ["Thessaloniki", "Athens", "Patras", "Heraklion"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 36,
    question: "What is the capital of Portugal?",
    options: ["Porto", "Lisbon", "Coimbra", "Braga"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 37,
    question: "What is the capital of Ireland?",
    options: ["Cork", "Dublin", "Galway", "Limerick"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 38,
    question: "What is the capital of New Zealand?",
    options: ["Auckland", "Wellington", "Christchurch", "Hamilton"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 39,
    question: "What is the capital of Chile?",
    options: ["Valparaíso", "Santiago", "Concepción", "La Serena"],
    correct: 1,
    category: "Countries & Capitals"
  },
  {
    id: 40,
    question: "What is the capital of Peru?",
    options: ["Arequipa", "Lima", "Trujillo", "Chiclayo"],
    correct: 1,
    category: "Countries & Capitals"
  },

  // Landmarks & Monuments (35 questions)
  {
    id: 41,
    question: "In which country is the Eiffel Tower located?",
    options: ["Italy", "France", "Spain", "Germany"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 42,
    question: "In which country is the Great Wall of China located?",
    options: ["Japan", "China", "South Korea", "Mongolia"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 43,
    question: "In which country is the Statue of Liberty located?",
    options: ["Canada", "United States", "Mexico", "Cuba"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 44,
    question: "In which country is the Taj Mahal located?",
    options: ["Pakistan", "India", "Bangladesh", "Nepal"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 45,
    question: "In which country is the Colosseum located?",
    options: ["Greece", "Italy", "Spain", "Turkey"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 46,
    question: "In which country is Machu Picchu located?",
    options: ["Mexico", "Peru", "Chile", "Bolivia"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 47,
    question: "In which country is the Sydney Opera House located?",
    options: ["New Zealand", "Australia", "Fiji", "Papua New Guinea"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 48,
    question: "In which country is the Christ the Redeemer statue located?",
    options: ["Argentina", "Brazil", "Chile", "Uruguay"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 49,
    question: "In which country is the Pyramids of Giza located?",
    options: ["Libya", "Egypt", "Sudan", "Ethiopia"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 50,
    question: "In which country is the Big Ben located?",
    options: ["Ireland", "United Kingdom", "France", "Netherlands"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 51,
    question: "In which country is the Golden Gate Bridge located?",
    options: ["Canada", "United States", "Mexico", "Cuba"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 52,
    question: "In which country is the Leaning Tower of Pisa located?",
    options: ["France", "Italy", "Spain", "Greece"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 53,
    question: "In which country is the Angkor Wat located?",
    options: ["Thailand", "Cambodia", "Vietnam", "Laos"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 54,
    question: "In which country is the Petra located?",
    options: ["Israel", "Jordan", "Syria", "Lebanon"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 55,
    question: "In which country is the Stonehenge located?",
    options: ["Scotland", "United Kingdom", "Ireland", "Wales"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 56,
    question: "In which country is the Mount Rushmore located?",
    options: ["Canada", "United States", "Mexico", "Cuba"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 57,
    question: "In which country is the Sagrada Familia located?",
    options: ["Portugal", "Spain", "France", "Italy"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 58,
    question: "In which country is the Neuschwanstein Castle located?",
    options: ["Austria", "Germany", "Switzerland", "Czech Republic"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 59,
    question: "In which country is the Burj Khalifa located?",
    options: ["Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 60,
    question: "In which country is the CN Tower located?",
    options: ["United States", "Canada", "Mexico", "Cuba"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 61,
    question: "In which country is the Brandenburg Gate located?",
    options: ["Austria", "Germany", "Switzerland", "Poland"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 62,
    question: "In which country is the Acropolis located?",
    options: ["Turkey", "Greece", "Italy", "Albania"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 63,
    question: "In which country is the Kremlin located?",
    options: ["Ukraine", "Russia", "Belarus", "Poland"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 64,
    question: "In which country is the Forbidden City located?",
    options: ["Japan", "China", "South Korea", "Mongolia"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 65,
    question: "In which country is the Alhambra located?",
    options: ["Portugal", "Spain", "Morocco", "France"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 66,
    question: "In which country is the Tower Bridge located?",
    options: ["Scotland", "United Kingdom", "Ireland", "Wales"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 67,
    question: "In which country is the Chichen Itza located?",
    options: ["Guatemala", "Mexico", "Belize", "Honduras"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 68,
    question: "In which country is the Mount Fuji located?",
    options: ["South Korea", "Japan", "China", "North Korea"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 69,
    question: "In which country is the Table Mountain located?",
    options: ["Namibia", "South Africa", "Botswana", "Zimbabwe"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 70,
    question: "In which country is the Niagara Falls located?",
    options: ["United States and Canada", "United States only", "Canada only", "Mexico and United States"],
    correct: 0,
    category: "Landmarks & Monuments"
  },
  {
    id: 71,
    question: "In which country is the Victoria Falls located?",
    options: ["Zambia and Zimbabwe", "Zambia only", "Zimbabwe only", "Botswana and Zimbabwe"],
    correct: 0,
    category: "Landmarks & Monuments"
  },
  {
    id: 72,
    question: "In which country is the Matterhorn located?",
    options: ["Austria and Switzerland", "Switzerland only", "Italy and Switzerland", "France and Switzerland"],
    correct: 2,
    category: "Landmarks & Monuments"
  },
  {
    id: 73,
    question: "In which country is the Uluru (Ayers Rock) located?",
    options: ["New Zealand", "Australia", "Fiji", "Papua New Guinea"],
    correct: 1,
    category: "Landmarks & Monuments"
  },
  {
    id: 74,
    question: "In which country is the Iguazu Falls located?",
    options: ["Brazil and Argentina", "Brazil only", "Argentina only", "Paraguay and Brazil"],
    correct: 0,
    category: "Landmarks & Monuments"
  },
  {
    id: 75,
    question: "In which country is the Mount Kilimanjaro located?",
    options: ["Kenya", "Tanzania", "Uganda", "Rwanda"],
    correct: 1,
    category: "Landmarks & Monuments"
  },

  // Flags & Symbols (30 questions)
  {
    id: 76,
    question: "Which country's flag features a red maple leaf?",
    options: ["United States", "Canada", "United Kingdom", "Australia"],
    correct: 1,
    category: "Flags & Symbols"
  },
  {
    id: 77,
    question: "Which country's flag features a red circle on a white background?",
    options: ["South Korea", "Japan", "China", "Vietnam"],
    correct: 1,
    category: "Flags & Symbols"
  },
  {
    id: 78,
    question: "Which country's flag features a Union Jack in the corner?",
    options: ["Ireland", "Australia", "New Zealand", "Both Australia and New Zealand"],
    correct: 3,
    category: "Flags & Symbols"
  },
  {
    id: 79,
    question: "Which country's flag features a white cross on a red background?",
    options: ["Denmark", "Switzerland", "Norway", "Sweden"],
    correct: 1,
    category: "Flags & Symbols"
  },
  {
    id: 80,
    question: "Which country's flag features a green, white, and orange tricolor?",
    options: ["Italy", "Ireland", "India", "Ivory Coast"],
    correct: 1,
    category: "Flags & Symbols"
  },
  {
    id: 81,
    question: "Which country's flag features a red, white, and blue tricolor?",
    options: ["France", "Netherlands", "Russia", "All of the above"],
    correct: 3,
    category: "Flags & Symbols"
  },
  {
    id: 82,
    question: "Which country's flag features a yellow star on a red background?",
    options: ["China", "Vietnam", "Turkey", "Morocco"],
    correct: 0,
    category: "Flags & Symbols"
  },
  {
    id: 83,
    question: "Which country's flag features a crescent and star?",
    options: ["Turkey", "Pakistan", "Malaysia", "All of the above"],
    correct: 3,
    category: "Flags & Symbols"
  },
  {
    id: 84,
    question: "Which country's flag features a bald eagle?",
    options: ["Mexico", "United States", "Germany", "Poland"],
    correct: 1,
    category: "Flags & Symbols"
  },
  {
    id: 85,
    question: "Which country's flag features a Southern Cross constellation?",
    options: ["New Zealand", "Australia", "Brazil", "All of the above"],
    correct: 3,
    category: "Flags & Symbols"
  },
  {
    id: 86,
    question: "Which country's flag features a red dragon?",
    options: ["China", "Wales", "Bhutan", "Malaysia"],
    correct: 1,
    category: "Flags & Symbols"
  },
  {
    id: 87,
    question: "Which country's flag features a green, yellow, and red tricolor?",
    options: ["Italy", "Ethiopia", "Ghana", "Both Ethiopia and Ghana"],
    correct: 3,
    category: "Flags & Symbols"
  },
  {
    id: 88,
    question: "Which country's flag features a blue and white cross?",
    options: ["Greece", "Finland", "Iceland", "Norway"],
    correct: 0,
    category: "Flags & Symbols"
  },
  {
    id: 89,
    question: "Which country's flag features a red and white checkered pattern?",
    options: ["Croatia", "Poland", "Czech Republic", "Slovakia"],
    correct: 0,
    category: "Flags & Symbols"
  },
  {
    id: 90,
    question: "Which country's flag features a green, white, and red tricolor?",
    options: ["Italy", "Mexico", "Hungary", "Both Italy and Mexico"],
    correct: 3,
    category: "Flags & Symbols"
  },
  {
    id: 91,
    question: "Which country's flag features a black, red, and gold tricolor?",
    options: ["Belgium", "Germany", "Netherlands", "Austria"],
    correct: 1,
    category: "Flags & Symbols"
  },
  {
    id: 92,
    question: "Which country's flag features a red, white, and green tricolor?",
    options: ["Italy", "Hungary", "Bulgaria", "All of the above"],
    correct: 3,
    category: "Flags & Symbols"
  },
  {
    id: 93,
    question: "Which country's flag features a blue and yellow bicolor?",
    options: ["Sweden", "Ukraine", "Estonia", "Latvia"],
    correct: 1,
    category: "Flags & Symbols"
  },
  {
    id: 94,
    question: "Which country's flag features a red and white bicolor?",
    options: ["Poland", "Indonesia", "Monaco", "All of the above"],
    correct: 3,
    category: "Flags & Symbols"
  },
  {
    id: 95,
    question: "Which country's flag features a green and white bicolor?",
    options: ["Pakistan", "Nigeria", "Saudi Arabia", "Both Pakistan and Nigeria"],
    correct: 3,
    category: "Flags & Symbols"
  },
  {
    id: 96,
    question: "Which country's flag features a blue and red bicolor?",
    options: ["France", "Chile", "Croatia", "Both France and Chile"],
    correct: 3,
    category: "Flags & Symbols"
  },
  {
    id: 97,
    question: "Which country's flag features a yellow and blue bicolor?",
    options: ["Sweden", "Ukraine", "Estonia", "Both Sweden and Ukraine"],
    correct: 3,
    category: "Flags & Symbols"
  },
  {
    id: 98,
    question: "Which country's flag features a red and green bicolor?",
    options: ["Portugal", "Morocco", "Bangladesh", "All of the above"],
    correct: 3,
    category: "Flags & Symbols"
  },
  {
    id: 99,
    question: "Which country's flag features a white and blue bicolor?",
    options: ["Finland", "Greece", "Argentina", "All of the above"],
    correct: 3,
    category: "Flags & Symbols"
  },
  {
    id: 100,
    question: "Which country's flag features a red and yellow bicolor?",
    options: ["Spain", "Colombia", "Venezuela", "All of the above"],
    correct: 3,
    category: "Flags & Symbols"
  },
  {
    id: 101,
    question: "Which country's flag features a green and red bicolor?",
    options: ["Portugal", "Morocco", "Bangladesh", "All of the above"],
    correct: 3,
    category: "Flags & Symbols"
  },
  {
    id: 102,
    question: "Which country's flag features a blue and green bicolor?",
    options: ["Brazil", "Jamaica", "Seychelles", "All of the above"],
    correct: 3,
    category: "Flags & Symbols"
  },
  {
    id: 103,
    question: "Which country's flag features a red and blue bicolor?",
    options: ["France", "Chile", "Croatia", "All of the above"],
    correct: 3,
    category: "Flags & Symbols"
  },
  {
    id: 104,
    question: "Which country's flag features a yellow and red bicolor?",
    options: ["Spain", "Colombia", "Venezuela", "All of the above"],
    correct: 3,
    category: "Flags & Symbols"
  },
  {
    id: 105,
    question: "Which country's flag features a white and red bicolor?",
    options: ["Poland", "Indonesia", "Monaco", "All of the above"],
    correct: 3,
    category: "Flags & Symbols"
  },

  // Continents & Regions (25 questions)
  {
    id: 106,
    question: "Which continent is the largest by area?",
    options: ["Africa", "Asia", "North America", "Europe"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 107,
    question: "Which continent is the smallest by area?",
    options: ["Europe", "Australia", "Antarctica", "South America"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 108,
    question: "Which continent has the most countries?",
    options: ["Africa", "Asia", "Europe", "North America"],
    correct: 0,
    category: "Continents & Regions"
  },
  {
    id: 109,
    question: "Which continent is home to the Amazon Rainforest?",
    options: ["Africa", "Asia", "South America", "North America"],
    correct: 2,
    category: "Continents & Regions"
  },
  {
    id: 110,
    question: "Which continent is home to the Sahara Desert?",
    options: ["Asia", "Africa", "Australia", "North America"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 111,
    question: "Which continent is home to the Himalayas?",
    options: ["Europe", "Asia", "Africa", "North America"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 112,
    question: "Which continent is home to the Alps?",
    options: ["Asia", "Europe", "Africa", "North America"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 113,
    question: "Which continent is home to the Rocky Mountains?",
    options: ["South America", "North America", "Asia", "Europe"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 114,
    question: "Which continent is home to the Andes Mountains?",
    options: ["North America", "South America", "Asia", "Africa"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 115,
    question: "Which continent is home to the Great Barrier Reef?",
    options: ["Asia", "Australia", "Africa", "North America"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 116,
    question: "Which continent is home to the Nile River?",
    options: ["Asia", "Africa", "Europe", "North America"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 117,
    question: "Which continent is home to the Mississippi River?",
    options: ["South America", "North America", "Asia", "Europe"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 118,
    question: "Which continent is home to the Yangtze River?",
    options: ["Africa", "Asia", "Europe", "North America"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 119,
    question: "Which continent is home to the Danube River?",
    options: ["Asia", "Europe", "Africa", "North America"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 120,
    question: "Which continent is home to the Ganges River?",
    options: ["Africa", "Asia", "Europe", "North America"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 121,
    question: "Which continent is home to the Congo River?",
    options: ["Asia", "Africa", "Europe", "North America"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 122,
    question: "Which continent is home to the Volga River?",
    options: ["Asia", "Europe", "Africa", "North America"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 123,
    question: "Which continent is home to the Thames River?",
    options: ["Asia", "Europe", "Africa", "North America"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 124,
    question: "Which continent is home to the Seine River?",
    options: ["Asia", "Europe", "Africa", "North America"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 125,
    question: "Which continent is home to the Rhine River?",
    options: ["Asia", "Europe", "Africa", "North America"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 126,
    question: "Which continent is home to the Elbe River?",
    options: ["Asia", "Europe", "Africa", "North America"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 127,
    question: "Which continent is home to the Po River?",
    options: ["Asia", "Europe", "Africa", "North America"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 128,
    question: "Which continent is home to the Tagus River?",
    options: ["Asia", "Europe", "Africa", "North America"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 129,
    question: "Which continent is home to the Loire River?",
    options: ["Asia", "Europe", "Africa", "North America"],
    correct: 1,
    category: "Continents & Regions"
  },
  {
    id: 130,
    question: "Which continent is home to the Rhone River?",
    options: ["Asia", "Europe", "Africa", "North America"],
    correct: 1,
    category: "Continents & Regions"
  },

  // Physical Geography (20 questions)
  {
    id: 131,
    question: "What is the longest river in the world?",
    options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
    correct: 1,
    category: "Physical Geography"
  },
  {
    id: 132,
    question: "What is the largest ocean in the world?",
    options: ["Atlantic", "Pacific", "Indian", "Arctic"],
    correct: 1,
    category: "Physical Geography"
  },
  {
    id: 133,
    question: "What is the highest mountain in the world?",
    options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
    correct: 1,
    category: "Physical Geography"
  },
  {
    id: 134,
    question: "What is the largest desert in the world?",
    options: ["Gobi", "Sahara", "Arabian", "Kalahari"],
    correct: 1,
    category: "Physical Geography"
  },
  {
    id: 135,
    question: "What is the largest lake in the world?",
    options: ["Caspian Sea", "Superior", "Victoria", "Huron"],
    correct: 0,
    category: "Physical Geography"
  },
  {
    id: 136,
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correct: 1,
    category: "Physical Geography"
  },
  {
    id: 137,
    question: "What is the largest country in the world?",
    options: ["China", "Canada", "Russia", "United States"],
    correct: 2,
    category: "Physical Geography"
  },
  {
    id: 138,
    question: "What is the deepest ocean trench?",
    options: ["Java Trench", "Mariana Trench", "Tonga Trench", "Philippine Trench"],
    correct: 1,
    category: "Physical Geography"
  },
  {
    id: 139,
    question: "What is the largest island in the world?",
    options: ["Borneo", "Greenland", "New Guinea", "Madagascar"],
    correct: 1,
    category: "Physical Geography"
  },
  {
    id: 140,
    question: "What is the largest peninsula in the world?",
    options: ["Arabian Peninsula", "Indian Peninsula", "Iberian Peninsula", "Scandinavian Peninsula"],
    correct: 0,
    category: "Physical Geography"
  },
  {
    id: 141,
    question: "What is the largest gulf in the world?",
    options: ["Gulf of Mexico", "Persian Gulf", "Gulf of Guinea", "Gulf of Alaska"],
    correct: 0,
    category: "Physical Geography"
  },
  {
    id: 142,
    question: "What is the largest bay in the world?",
    options: ["Hudson Bay", "Bay of Bengal", "Chesapeake Bay", "San Francisco Bay"],
    correct: 1,
    category: "Physical Geography"
  },
  {
    id: 143,
    question: "What is the largest sea in the world?",
    options: ["Mediterranean Sea", "Caribbean Sea", "South China Sea", "Bering Sea"],
    correct: 0,
    category: "Physical Geography"
  },
  {
    id: 144,
    question: "What is the largest waterfall in the world?",
    options: ["Niagara Falls", "Victoria Falls", "Angel Falls", "Iguazu Falls"],
    correct: 2,
    category: "Physical Geography"
  },
  {
    id: 145,
    question: "What is the largest glacier in the world?",
    options: ["Lambert Glacier", "Hubbard Glacier", "Perito Moreno Glacier", "Franz Josef Glacier"],
    correct: 0,
    category: "Physical Geography"
  },
  {
    id: 146,
    question: "What is the largest volcano in the world?",
    options: ["Mauna Loa", "Mount Etna", "Krakatoa", "Mount Vesuvius"],
    correct: 0,
    category: "Physical Geography"
  },
  {
    id: 147,
    question: "What is the largest canyon in the world?",
    options: ["Grand Canyon", "Fish River Canyon", "Colca Canyon", "Copper Canyon"],
    correct: 0,
    category: "Physical Geography"
  },
  {
    id: 148,
    question: "What is the largest delta in the world?",
    options: ["Nile Delta", "Ganges Delta", "Mississippi Delta", "Mekong Delta"],
    correct: 1,
    category: "Physical Geography"
  },
  {
    id: 149,
    question: "What is the largest archipelago in the world?",
    options: ["Philippines", "Indonesia", "Japan", "Malaysia"],
    correct: 1,
    category: "Physical Geography"
  },
  {
    id: 150,
    question: "What is the largest atoll in the world?",
    options: ["Aldabra", "Kiritimati", "Kwajalein", "Rangiroa"],
    correct: 1,
    category: "Physical Geography"
  }
];

// Get random world geography questions for the test
export const getRandomWorldGeographyQuestions = (count = 15): Question[] => {
  // Group questions by category
  const categories = {
    'Countries & Capitals': worldGeographyQuestions.filter(q => q.category === 'Countries & Capitals'),
    'Landmarks & Monuments': worldGeographyQuestions.filter(q => q.category === 'Landmarks & Monuments'),
    'Flags & Symbols': worldGeographyQuestions.filter(q => q.category === 'Flags & Symbols'),
    'Continents & Regions': worldGeographyQuestions.filter(q => q.category === 'Continents & Regions'),
    'Physical Geography': worldGeographyQuestions.filter(q => q.category === 'Physical Geography')
  };
  
  // Balanced selection: 3 questions from each of the 5 categories
  const selectedQuestions: Question[] = [];
  
  Object.entries(categories).forEach(([categoryName, questions]) => {
    // Shuffle questions in this category
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Take 3 questions from each category
    selectedQuestions.push(...shuffled.slice(0, 3));
  });
  
  // Shuffle the final selection to randomize order
  const finalShuffle = [...selectedQuestions];
  for (let i = finalShuffle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [finalShuffle[i], finalShuffle[j]] = [finalShuffle[j], finalShuffle[i]];
  }
  
  return finalShuffle.map((question: Question, index: number) => ({
    ...question,
    id: index + 1 // Reassign IDs for the selected questions
  }));
};

// Calculate world geography test score based on answers
export const calculateWorldGeographyScore = (answers: Record<number, number>, questions: Question[], answerTimes: Record<number, number>) => {
  let correctAnswers = 0;
  let speedPoints = 0;
  const totalQuestions = questions.length;
  let totalTime = 0;
  
  questions.forEach((question: Question) => {
    const userAnswer = answers[question.id];
    const answerTime = answerTimes[question.id] || 0;
    totalTime += answerTime;
    
    if (userAnswer !== undefined && userAnswer === question.correct) {
      correctAnswers++;
      
      // Calculate speed penalty points based on response time (only for correct answers)
      let speedMultiplier = 1.0;
      if (answerTime < 10) {
        speedMultiplier = 1.0; // No penalty - Lightning Fast
      } else if (answerTime < 20) {
        speedMultiplier = 0.9; // 10% penalty - Quick
      } else {
        speedMultiplier = 0.8; // 20% penalty - Slow
      }
      speedPoints += speedMultiplier;
    }
  });
  
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
  const speedScore = Math.min(Math.round((speedPoints / totalQuestions) * 100), accuracy); // Speed score cannot exceed test score
  const averageTime = totalTime / totalQuestions;
  
  // Determine knowledge level
  let level = "";
  let description = "";
  
  if (accuracy >= 90) {
    level = "Geography Expert";
    description = "Exceptional world geography knowledge with mastery of countries, capitals, landmarks, and physical features.";
  } else if (accuracy >= 80) {
    level = "Geography Scholar";
    description = "Strong world geography knowledge with good understanding of global locations and features.";
  } else if (accuracy >= 70) {
    level = "Geography Enthusiast";
    description = "Solid world geography knowledge with room for improvement in specific areas.";
  } else if (accuracy >= 60) {
    level = "Geography Learner";
    description = "Basic world geography knowledge with significant room for growth and exploration.";
  } else {
    level = "Geography Beginner";
    description = "Developing world geography knowledge. Consider exploring maps, atlases, and travel resources.";
  }
  
  // Calculate category scores
  const categoryScores: Record<string, number> = {};
  const categoryTotals: Record<string, number> = {};
  const categoryCorrect: Record<string, number> = {};
  
  questions.forEach((question: Question) => {
    const category = question.category;
    if (!categoryScores[category]) {
      categoryScores[category] = 0;
      categoryTotals[category] = 0;
      categoryCorrect[category] = 0;
    }
    
    categoryTotals[category]++;
    const userAnswer = answers[question.id];
    if (userAnswer !== undefined && userAnswer === question.correct) {
      categoryCorrect[category]++;
    }
  });
  
  // Calculate category percentages
  Object.keys(categoryScores).forEach(category => {
    categoryScores[category] = Math.round((categoryCorrect[category] / categoryTotals[category]) * 100);
  });
  
  return {
    correctAnswers,
    totalQuestions,
    accuracy,
    speedScore,
    level,
    description,
    categoryScores,
    averageTime: Math.round(averageTime),
    totalTime: Math.round(totalTime),
    speedFeedback: averageTime < 15 ? 'Very Fast' : averageTime < 25 ? 'Fast' : 'Normal'
  };
};
