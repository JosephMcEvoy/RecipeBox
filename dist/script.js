class App extends React.Component {
  constructor(props) {
    super(props);
    if (typeof localStorage["recipeList"] !== "undefined") {
      this.state = {
        recipeList: JSON.parse(localStorage["recipeList"]) };

    } else {
      this.state = {
        recipeList: [] };

    }
  }

  componentDidUpdate() {
    localStorage.setItem("recipeList", JSON.stringify(this.state.recipeList));
  }

  removeRecipe(recipeIndex) {
    this.setState({
      recipeList: this.state.recipeList.filter((element, index, array) => array.indexOf(element) !== recipeIndex) });

  }

  editRecipe(name, ingredients, recipeIndex) {
    let newRecipeList = this.state.recipeList.slice(0, recipeIndex).
    concat([{ name: name, ingredients: ingredients.split(',') }]).
    concat(this.state.recipeList.slice(recipeIndex + 1, this.state.recipeList.length + 1));
    console.log(newRecipeList);
    this.setState({
      recipeList: newRecipeList });

  }

  addRecipe(name, ingredients) {
    if (name !== "" && ingredients !== "") {
      let newRecipe = {
        name: name,
        ingredients: ingredients.split(',') };

      let newRecipeList = this.state.recipeList;
      newRecipeList.push(newRecipe);
      this.setState({
        recipeList: newRecipeList });

    }
  }
  render() {
    return (
      React.createElement("div", null,
      React.createElement(Header, null),
      React.createElement(RecipeBox, { recipeList: this.state.recipeList, removeRecipe: this.removeRecipe.bind(this), addRecipe: this.addRecipe.bind(this), editRecipe: this.editRecipe.bind(this) }),
      React.createElement(Footer, null)));


  }}


class Header extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "header" },
      React.createElement("h1", null, "Recipe Box")));


  }}


class RecipeBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      React.createElement("div", { className: "recipe-box" },
      React.createElement(AddRecipe, { addRecipe: this.props.addRecipe }),
      this.props.recipeList.map((recipe, index) => React.createElement(Recipe, { index: index, name: recipe.name, ingredients: recipe.ingredients, removeRecipe: this.props.removeRecipe, editRecipe: this.props.editRecipe }), this)));


  }}


class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
  }
  addRecipeHelper(e) {
    e.preventDefault();
    this.props.addRecipe(this.name.value, this.ingredients.value);
  }
  render() {
    return (
      React.createElement("div", { className: "recipe recipe-add" },
      React.createElement("form", { onSubmit: this.addRecipeHelper.bind(this) },
      React.createElement("div", null, React.createElement("textarea", { placeholder: "Name", className: "add-name", ref: a => this.name = a })),
      React.createElement("div", null, React.createElement("textarea", { placeholder: "Ingredients, separated by a comma", className: "add-ingredients", ref: a => this.ingredients = a })),
      React.createElement("div", null, React.createElement("button", { className: "btn-add", type: "submit" }, "Add")))));



  }}


class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canEdit: false };

  }
  handleClickRemove(key) {
    this.props.removeRecipe(this.props.index);
  }
  canBeEdited() {
    if (!this.state.canEdit) {
      this.setState({
        canEdit: true });

    } else {
      this.setState({
        canEdit: false });

    }
  }
  handleClickEdit(e) {
    e.preventDefault();
    this.props.editRecipe(this.name.value, this.ingredients.value, this.props.index);
    this.canBeEdited();
  }
  render() {
    if (!this.state.canEdit) {
      return (
        React.createElement("div", { className: "recipe" },
        React.createElement("div", { className: "recipe-inner" },
        React.createElement("h2", null, this.props.name),
        this.props.ingredients.map(function (ingredient, number) {
          return React.createElement("div", { className: "ingredient" }, ingredient);
        })),

        React.createElement("div", { className: "btn-box" },
        React.createElement("div", { className: "btn-edit", onClick: this.canBeEdited.bind(this) }, "Edit"),
        React.createElement("div", { className: "btn-remove", onClick: this.handleClickRemove.bind(this) }, "Remove"))));



    } else {
      return (
        React.createElement("div", { className: "recipe recipe-add" },
        React.createElement("form", { onSubmit: "" },
        React.createElement("div", null, React.createElement("textarea", { className: "add-name", ref: a => this.name = a }, this.props.name)),
        React.createElement("div", null, React.createElement("textarea", { className: "add-ingredients", ref: a => this.ingredients = a }, this.props.ingredients)),
        React.createElement("div", { className: "btn-box" },
        React.createElement("div", { className: "btn-edit", onClick: this.handleClickEdit.bind(this) }, "Edit"),
        React.createElement("div", { className: "btn-remove", onClick: this.handleClickRemove.bind(this) }, "Remove")))));




    }
  }}


class Footer extends React.Component {
  render() {
    return (
      React.createElement("footer", null, "by maci01"));



  }}


ReactDOM.render(React.createElement(App, null), document.getElementById('app'));