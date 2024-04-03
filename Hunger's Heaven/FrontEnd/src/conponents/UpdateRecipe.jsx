import React from 'react'

const UpdateRecipe = () => {
    const [formData, setFormData] = useState({
        recipeName: '',
        persons: '',
        ingredients: [{ name: '', amount: '' }],
        method: '',
        category: '',
        spiceLevel: '',
        type: '',
        cuisine: '',
        images :'',
      });
      
      const [files, setFiles] = useState([]);
      const [previewUrls, setPreviewUrls] = useState('');
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleIngredientChange = (e, index) => {
        const { name, value } = e.target; // `name` would be either "name" or "amount"
    
        // Create a new copy of the ingredients array
        const newIngredients = [...formData.ingredients];
        // Update the specific ingredient object at the given index
        newIngredients[index][name] = value;
    
        // Update the formData state with the new ingredients array
        setFormData({
            ...formData,
            ingredients: newIngredients,
        });
    
      
    };
    
      const addIngredient = () => {
        setFormData({
          ...formData,
          ingredients: [...formData.ingredients, { name: '', amount: '' }],
        });
      };
      
      const removeIngredient = (index) => {
        const updatedIngredients = [...formData.ingredients];
        updatedIngredients.splice(index, 1);
        setFormData({ ...formData, ingredients: updatedIngredients });
      };
    
      const handleFileChange = (e) => {
        setFiles(e.target.files);
        // Optionally upload files here and update formData with image URLs
      };
    
      useEffect(() => {
        if (files.length < 1) return;
        const newFileUrls = [];
        for (let image of files) {
          newFileUrls.push(URL.createObjectURL(image));
        }
        // Assuming you have a state to hold these URLs for preview
        setPreviewUrls(newFileUrls);
      }, [files]);
    
    
      const createdBy = localStorage.getItem("email");
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        let responseData;
        let recipe = formData;
        let dataElement = new FormData();
        for (let file of files) {
          dataElement.append('images', file);
        }
        dataElement.append('recipeName', formData.recipeName);
        dataElement.append('persons', formData.persons);
        formData.ingredients.forEach((ingredient, index) => {
          dataElement.append(`ingredients[${index}][name]`, ingredient.name);
          dataElement.append(`ingredients[${index}][amount]`, ingredient.amount);
        });
        dataElement.append('method', formData.method);
        dataElement.append('category', formData.category);
        dataElement.append('spiceLevel', formData.spiceLevel);
        dataElement.append('persons', formData.persons);
        dataElement.append('type', formData.type);
        dataElement.append('cuisine', formData.cuisine);
        dataElement.append('email', createdBy);
        await fetch('http://localhost:3000/upload',{
          method:'POST',
          body:dataElement,
        })
        .then((resp)=> resp.json())
        
        .then((data)=> {
          responseData=data
        })
        .catch((error) => {
          console.error('Error uploading files:', error);
        });
    
        if(responseData && responseData.success){
          recipe = {...formData,created : createdBy};
          recipe.images = responseData.image_url;
          console.log(recipe);
          await fetch('http://localhost:3000/api/recipes',{
            method:'POST',
            headers:{
                'content-Type':'application/json',
            },
            body:JSON.stringify(recipe),
          }).then((resp)=>resp.json()).then((data)=>{
            data.success?alert("Product added"):alert("Failed");
          })
        }
      }
      
    
    
  return (
    <FormContainer>
    <StyledForm action='/upload' onSubmit={handleSubmit} method="POST" encType="multipart/form-data" >
      <h2>Add a Recipe</h2>
      <FormField>
        <Label htmlFor="recipeName">Recipe Name:</Label>
        <Input
          type="text"
          id="recipeName"
          name="recipeName"
          value={formData.recipeName}
          onChange={handleChange}
        />
      </FormField>
      
      <FormField>
        <Label htmlFor="persons">Persons:</Label>
        <Input
          type="number"
          id="persons"
          name="persons"
          value={formData.persons}
          onChange={handleChange}
          placeholder="Number of servings"
        />
      </FormField>

      <FormField>
<Label>Ingredients:</Label>
{formData.ingredients.map((ingredient, index) => (
  <div key={index}>
    <Input
      type="text"
      placeholder="Ingredient name"
      name="name"
      value={ingredient.name}
      onChange={(e) => handleIngredientChange(e, index)}
    />
  <Input
      type="text"
      placeholder="Amount"
      name="amount"
      value={ingredient.amount}
      onChange={(e) => handleIngredientChange(e, index)}
    />
    <Button type="button" onClick={() => removeIngredient(index)}>Remove</Button>
  </div>
))}
<Button type="button" onClick={addIngredient}>Add Ingredient</Button>
</FormField>


      <FormField>
        <Label htmlFor="method">Method:</Label>
        <TextArea
          id="method"
          name="method"
          value={formData.method}
          onChange={handleChange}
          placeholder="Cooking instructions"
        />
      </FormField>

      <FormField>
        <Label htmlFor="category">Category:</Label>
        <Select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select a Category</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="dessert">Dessert</option>
        </Select>
      </FormField>

      <FormField>
        <Label htmlFor="spiceLevel">Spice Level:</Label>
        <Select
          id="spiceLevel"
          name="spiceLevel"
          value={formData.spiceLevel}
          onChange={handleChange}
        >
          <option value="">Select Spice Level</option>
          <option value="mild">Mild</option>
          <option value="medium">Medium</option>
          <option value="hot">Hot</option>
        </Select>
      </FormField>

      <FormField>
        <Label htmlFor="type">Type:</Label>
        <Select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="">Select a Type</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="meat">Meat</option>
          <option value="dessert">Dessert</option>
          {/* Add more types as necessary */}
        </Select>
      </FormField>
      <FormField>
        <Label htmlFor="cuisine">Cuisine:</Label>
        <Select
          id="cuisine"
          name="cuisine"
          value={formData.cuisine}
          onChange={handleChange}
        >
          <option value="">Select Cuisine</option>
          <option value="italian">Italian</option>
          <option value="mexican">Mexican</option>
          <option value="indian">Indian</option>
          <option value="chinese">Chinese</option>
          <option value="japanese">Japanese</option>
          <option value="french">French</option>
          {/* Add more cuisines as necessary */}
        </Select>
      </FormField>
      
      <FormField>
        <Label>Images:</Label>
        <Input
          type="file"
          name="images"
          onChange={handleFileChange}
          accept="image/*"
          multiple = {true}
        />
        <ImagePreviewContainer>
        
          {Array.isArray(files) && files.map(file => (
              <ImagePreview key={index} src={src} alt={`Preview ${index + 1}`} />
          ))}

        </ImagePreviewContainer>
      </FormField>

      <Button type="submit">Update Recipe</Button>
    </StyledForm>
  </FormContainer>
  )
}

export default UpdateRecipe