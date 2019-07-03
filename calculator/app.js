// Shape function represents a shape
function Shape(shape, shapeArea) {
  this.shape = shape;
  this.shapeArea = shapeArea;
}

Shape.prototype.calculateArea = function() {};

function Square(shape, shapeArea, side) {
  this.shape = shape;
  this.shapeArea = shapeArea;
  this.side = side;
}

Square.prototype = Object.create(Shape.prototype);

Object.defineProperty(Square.prototype, "constructor", {
  value: Square,
  enumerable: false, // so that it does not appear in 'for in' loop
  writable: true
});

function Circle(shape, shapeArea, diameter) {
  this.shape = shape;
  this.shapeArea = shapeArea;
  this.diameter = diameter;
}

Circle.prototype = Object.create(Shape.prototype);

Object.defineProperty(Circle.prototype, "constructor", {
  value: Circle,
  enumerable: false,
  writable: true
});

function Rectangle(shape, shapeArea, length, breadth) {
  this.shape = shape;
  this.shapeArea = shapeArea;
  this.length = length;
  this.breadth = breadth;
}

Rectangle.prototype = Object.create(Shape.prototype);

Object.defineProperty(Rectangle.prototype, "constructor", {
  value: Rectangle,
  enumerable: false,
  writable: true
});

function Ellipse(shape, shapeArea, base, height) {
  this.shape = shape;
  this.shapeArea = shapeArea;
  this.base = base;
  this.height = height;
}

Ellipse.prototype = Object.create(Shape.prototype);

Object.defineProperty(Ellipse.prototype, "constructor", {
  value: Ellipse,
  enumerable: false,
  writable: true
});

Square.prototype.calculateArea = function() {
  this.shapeArea = this.side * this.side;
  Store.addShape(this);
};

Circle.prototype.calculateArea = function() {
  const pi = 3.142;
  let radius = this.diameter / 2;
  this.shapeArea = pi * radius * radius;
  Store.addShape(this);
};

Rectangle.prototype.calculateArea = function() {
  this.shapeArea = this.length * this.breadth;
  Store.addShape(this);
};

Ellipse.prototype.calculateArea = function() {
  const pi = 3.142;
  this.shapeArea = pi * this.height * this.base;
  Store.addShape(this);
};

// UI class: handle UI tasks
class UI {
  static hideFormOne() {
    const formOneClassList = document.querySelector("#calc-form-one").classList;

    if (formOneClassList.length && formOneClassList.contains("show")) {
      formOneClassList.remove("show");
    }
    formOneClassList.add("hide");
  }

  static showFormOne() {
    const formOneClassList = document.querySelector("#calc-form-one").classList;

    if (formOneClassList.length && formOneClassList.contains("hide")) {
      formOneClassList.remove("hide");
    }
    formOneClassList.add("show");
  }

  static hideFormTwo() {
    const formTwoClassList = document.querySelector("#calc-form-two").classList;

    if (formTwoClassList.length && formTwoClassList.contains("show")) {
      formTwoClassList.remove("show");
    }
    formTwoClassList.add("hide");
  }

  static showFormTwo() {
    const formTwoClassList = document.querySelector("#calc-form-two").classList;

    if (formTwoClassList.length && formTwoClassList.contains("hide")) {
      formTwoClassList.remove("hide");
    }
    formTwoClassList.add("show");

    UI.renderShapeDimensionForm();
  }

  static initDisplay() {
    Store.removeShape();
    UI.displayFormOne();
  }

  static displayFormOne() {
    UI.showFormOne();
    UI.hideFormTwo();
  }

  static displayFormTwo() {
    UI.hideFormOne();
    UI.showFormTwo();
  }

  static renderShapeDimensionForm() {
    const shape = Store.getShape();

    const DimensionSelectionDiv = document.querySelector(
      "#dimensions-selection-div"
    );

    switch (shape.shape) {
      case "rectangle":
        DimensionSelectionDiv.innerHTML = UI.renderRectangleDimensionSelect();
        break;
      case "square":
        DimensionSelectionDiv.innerHTML = UI.renderSquareDimensionSelect();
        break;
      case "circle":
        DimensionSelectionDiv.innerHTML = UI.renderCircleDimensionSelect();
        break;
      case "ellipse":
        DimensionSelectionDiv.innerHTML = UI.renderEllipseDimensionSelect();
        break;
    }

    const buttonsDisplay = `
        <input
        type="button"
        name="cancel"
        value="Cancel"
        class="btn btn-primary btn-block mt-2 left"
      />
      <input
        type="submit"
        name="next"
        value="Next"
        class="btn btn-primary btn-block right"
      />`;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.innerHTML = buttonsDisplay;
    DimensionSelectionDiv.appendChild(buttonsDiv);
  }

  static renderRectangleDimensionSelect() {
    const renderRectangleDimensionSelect = `
        <p>
          <div>
            You have selected a rectangle. Please input the required values.
            <div>
              <b>Length:</b>
                <div class="row">
                  <input type="text" name="length" id="length" class="form-input-field" />
                </div>
              <b>Breadth:</b>
                <div class="row">
                  <input type="text" name="breadth" id="breadth" class="form-input-field" />
                </div>
            </div>    
          </div>
        </p>
      `;

    return renderRectangleDimensionSelect;
  }

  static renderSquareDimensionSelect() {
    const renderSquareDimensionSelect = `
        <p>
          <div>
            You have selected a square. Please input the required values.
            <div>
              <b>Side:</b>
                <div class="row">
                  <input type="text" name="side" id="side" class="form-input-field" />
                </div>
            </div>    
          </div>
        </p>
      `;

    return renderSquareDimensionSelect;
  }

  static renderCircleDimensionSelect() {
    const renderCircleDimensionSelect = `
        <p>
          <div>
            You have selected a circle. Please input the required values.
            <div>
              <b>Diameter:</b>
                <div class="row">
                  <input type="text" name="diameter" id="diameter" class="form-input-field" />
                </div>
            </div>    
          </div>
        </p>
      `;

    return renderCircleDimensionSelect;
  }

  static renderEllipseDimensionSelect() {
    const renderEllipseDimensionSelect = `
        <p>
          <div>
            You have selected a ellipse. Please input the required values.
            <div>
              <b>Height:</b>
                <div class="row">
                  <input type="text" name="height" id="height" class="form-input-field" />
                </div>
              <b>Base:</b>
                <div class="row">
                  <input type="text" name="base" id="base" class="form-input-field" />
                </div>
            </div>    
          </div>
        </p>
      `;

    return renderEllipseDimensionSelect;
  }

  static displayResult() {
    UI.hideFormOne();
    UI.hideFormTwo();

    const displayResultClassList = document.querySelector("#result-div")
      .classList;

    if (
      displayResultClassList.length &&
      displayResultClassList.contains("hide")
    ) {
      displayResultClassList.remove("hide");
      displayResultClassList.add("show");
    }

    const shape = Store.getShape();

    shape.calculateArea();

    Store.addShape(shape);
    document.querySelector("#result-div").innerHTML = `
        <div>
            <h5>
                <b>Step 3 - Your Results</b>
            </h5>
            <p class="areaText">
                You have calculated the area of ${shape.shape} to be ${
      shape.shapeArea
    }. Below is your result:
            </p>
            <p class="areaResult">The area is ${shape.shapeArea} sq. units</p>
        </div>`;

    const buttonsDisplay = `
      <input
      type="button"
      name="startover"
      id="startover"
      value="Start over"
      class="btn btn-primary btn-block mt-5"
    />`;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.innerHTML = buttonsDisplay;
    document.querySelector("#result-div").appendChild(buttonsDiv);

    // Event: Startover button click action - reset the local storage and display form one
    if (document.querySelector("#startover") !== null) {
      document.querySelector("#startover").addEventListener("click", e => {
        document.querySelector("#result-div").classList.add("hide");
        UI.initDisplay();
        document.querySelector("#calc-form-one").reset();
      });
    }
  }

  static displayMessage(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    const backgroundDiv = document.querySelector("div.background");
    const form = document.querySelector("form");
    backgroundDiv.insertBefore(div, form);

    // Vanish after 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }
}

// Store Class: handle local storage
class Store {
  static getShape() {
    let shape = [];
    let shapeObj;

    if (localStorage.getItem("shape") !== null) {
      shape = JSON.parse(localStorage.getItem("shape"));
    }

    switch (shape.shape) {
      case "square":
        shapeObj = new Square("square", shape.shapeArea, shape.side);
        break;
      case "rectangle":
        shapeObj = new Rectangle(
          "rectangle",
          shape.shapeArea,
          shape.length,
          shape.breadth
        );
        break;
      case "circle":
        shapeObj = new Circle("circle", shape.shapeArea, shape.diameter);
        break;
      case "ellipse":
        shapeObj = new Ellipse(
          "ellipse",
          shape.shapeArea,
          shape.base,
          shape.height
        );
        break;
    }

    return shapeObj;
  }

  static addShape(shape) {
    localStorage.setItem("shape", JSON.stringify(shape));
  }

  static removeShape() {
    localStorage.removeItem("shape");
  }
}

// Event: Display form one
document.addEventListener("DOMContentLoaded", UI.initDisplay);

// Event: Add a shape
document.querySelector("#calc-form-one").addEventListener("submit", e => {
  // Prevent actual submit
  e.preventDefault();

  // check if shape is selected
  if (document.querySelector("input[name='shape']:checked") === null) {
    // display error message
    UI.displayMessage("Please select a shape", "danger");
  } else {
    const shape = document.querySelector("input[name='shape']:checked").value;

    let shapeObj;

    switch (shape) {
      case "square":
        shapeObj = new Square("square", 0, 0);
        break;
      case "rectangle":
        shapeObj = new Rectangle("rectangle", 0, 0, 0);
        break;
      case "circle":
        shapeObj = new Circle("circle", 0, 0);
        break;
      case "ellipse":
        shapeObj = new Ellipse("ellipse", 0, 0, 0);
        break;
    }

    //  Add shape object to local storage
    Store.addShape(shapeObj);

    UI.displayFormTwo();
  }
});

// Event: Cancel action of form one - reset the form and clear the local storage
document
  .querySelector("#calc-form-one input[name='cancel']")
  .addEventListener("click", e => {
    document.querySelector("#calc-form-one").reset();
    Store.removeShape();
  });

// Event: Add dimensions for the shape - submit action of second form
document.querySelector("#calc-form-two").addEventListener("submit", e => {
  // Prevent actual submit
  e.preventDefault();
  let proceed = 1;

  const shape = Store.getShape();

  switch (shape.shape) {
    case "square":
      if (document.querySelector("input[name='side']").value === "") {
        proceed = 0;
      } else {
        shape.side = document.querySelector("input[name='side']").value;
      }
      break;
    case "circle":
      if (document.querySelector("input[name='diameter']").value === "") {
        proceed = 0;
      } else {
        shape.diameter = document.querySelector("input[name='diameter']").value;
      }
      break;
    case "rectangle":
      if (
        document.querySelector("input[name='length']").value === "" ||
        document.querySelector("input[name='breadth']").value === ""
      ) {
        proceed = 0;
      } else {
        shape.length = document.querySelector("input[name='length']").value;
        shape.breadth = document.querySelector("input[name='breadth']").value;
      }
      break;
    case "ellipse":
      if (
        document.querySelector("input[name='base']").value === "" ||
        document.querySelector("input[name='height']").value === ""
      ) {
        proceed = 0;
      } else {
        shape.base = document.querySelector("input[name='base']").value;
        shape.height = document.querySelector("input[name='height']").value;
      }
      break;
  }

  if (proceed) {
    Store.addShape(shape);
    UI.displayResult();
  } else {
    UI.displayMessage("Please enter the required values", "danger");
  }
});

// Event: Cancel action of form two - reset the form two and display form one
if (document.querySelector("#calc-form-two")) {
  document.querySelector("#calc-form-two").addEventListener("click", e => {
    if (e.target.name === "cancel") {
      document.querySelector("#calc-form-two").reset();
      UI.displayFormOne();
      UI.hideFormTwo();
    }
  });
}
