const getAutoResponse = (userMessage) => {
    const messageLower = userMessage.toLowerCase();
  
    if (messageLower.includes("hello")) {
      return "Hello! How can I assist you with recipes today?";
    } else if (messageLower.includes("recipe")) {
      return "Looking for recipes? Try asking me about a specific dish, like 'How do I make lasagna?'";
    } else if (messageLower.includes("vegetarian")) {
      return "Vegetarian dishes are wonderful! I can help you find recipes without meat. For example, you might enjoy a vegetable stir-fry or a lentil soup.";
    } else if (messageLower.includes("cook time")) {
      return "Cooking times vary! For quick meals, try searching for 'under 30 minutes' recipes.";
    } else if (messageLower.includes("ingredient substitution")) {
      return "Need to substitute an ingredient? Tell me what you're replacing, and I'll suggest alternatives.";
    } else if (messageLower.includes("calories")) {
      return "Looking for low-calorie recipes, or have specific dietary needs? I can help with that. Try asking for 'low-calorie breakfasts' or similar queries.";
    } else if (messageLower.includes("help")) {
      return "You can ask me for recipe suggestions, cooking tips, or help with using this app. For example, try 'Show me chicken recipes' or 'How do I substitute baking soda?'";
    } else if (messageLower.includes("breakfast")) {
      return "Breakfast is the most important meal of the day! How about some oatmeal pancakes or a fruit smoothie?";
    } else if (messageLower.includes("lunch")) {
      return "Looking for lunch ideas? A quinoa salad or a turkey avocado wrap might just do the trick!";
    } else if (messageLower.includes("dinner")) {
      return "Dinner ideas coming right up! Have you tried making a homemade pizza or a creamy pasta dish?";
    } else if (messageLower.includes("snack")) {
      return "Snacks are essential! How about some homemade granola bars or guacamole?";
    } else if (messageLower.includes("italian")) {
        return "Italian cuisine offers an abundance of taste, and is known for its regional diversity. Would you like to try making a classic Spaghetti Carbonara or a Margherita Pizza?";
      } else if (messageLower.includes("mexican")) {
        return "Mexican food is vibrant, delicious, and fun. How about whipping up some Tacos al Pastor or a fresh Guacamole for starters?";
      } else if (messageLower.includes("baking bread")) {
        return "Baking bread is both an art and a science. For beginners, I recommend starting with a simple no-knead bread. Would you like the recipe?";
      } else if (messageLower.includes("chocolate cake")) {
        return "Who doesn't love a chocolate cake? I have a great recipe for a moist and rich chocolate cake that's easy to make. Interested?";
      } else if (messageLower.includes("vegan")) {
        return "Vegan dishes can be both nourishing and delicious. How about trying a Vegan Chili or a Dairy-free Cashew Cheese?";
      } else if (messageLower.includes("grilling")) {
        return "Grilling brings out the best in foods with its smoky flavor. Whether it's Grilled Vegetables or BBQ Chicken, I can guide you through.";
      } else if (messageLower.includes("sushi")) {
        return "Making sushi at home can be a fun experience! Would you like to start with something simple like California Rolls?";
      } else if (messageLower.includes("indian")) {
        return "Indian cuisine is known for its bold flavors and spices. A great starting point could be Chana Masala or Butter Chicken. Which one piques your interest?";
      } else if (messageLower.includes("soup")) {
        return "Soup is comforting and can be made with almost anything you have on hand. Interested in a Classic Tomato Soup or perhaps a Hearty Lentil Soup?";
      } else if (messageLower.includes("quick breakfast")) {
        return "Quick breakfast options are essential for busy mornings. How about Overnight Oats or Avocado Toast for a healthy start?";
      } else if (messageLower.includes("meal prep")) {
        return "Meal prepping can save you a lot of time during the week. Would you like tips on meal prep-friendly recipes like Quinoa Salad or Chicken Burrito Bowls?";
      } else if (messageLower.includes("low carb")) {
        return "Low-carb dishes can be flavorful and satisfying. Interested in trying a Cauliflower Pizza Crust or Zucchini Noodles (Zoodles)?";
      }else {
      return "I'm not sure how to help with that. Can you try asking something else?";
    }
  };
  export default getAutoResponse;
  