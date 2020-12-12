import React from "react";
import Axios from "axios";

//and this load one album per the id

// class Content extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       content: {},
//     };
//   }

//   async componentDidMount() {
//     this.setState({
//       content: (await Axios.get(`/api/contents/${this.props.contentId}`)).data,
//     });
//   }

//   render() {
//     const { content } = this.state;
//     if (content.id) {
//       return "...loading";
//     }
//     return (
//       <div>
//         <a href="#">All Contents</a>
//         <h1>{content.name}</h1>
//         <h2>{content.suitcases.name}</h2>

//         <ul>
//           {content.suitcases.map((suitcase) => {
//             return <li key={suitcase.id}>{suitcase.name}</li>;
//           })}
//         </ul>
//       </div>
//     );
//   }
// }

//this loads all the albums

// const Contents = ({ contents }) => {
//   return (
//     <div>
//       <h1>Things To Pack</h1>
//       <ul>
//         {contents.map((content) => {
//           return (
//             <li key={content.id}>
//               <a href={`#${content.id}`}>{content.name}</a>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default class Main extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       contents: [],
//       contentId: "",
//     };
//   }

//   async componentDidMount() {
//     this.setState({ contents: (await Axios.get("/api/contents")).data });
//     window.addEventListener("hashchange", () => {
//       this.setState({ contentId: window.location.hash.slice(1) });
//     });
//     this.setState({ contentId: window.location.hash.slice(1) }); //this changes the hash or removes it after it reloads
//   }

//   render() {
//     const { contents, contentId } = this.state;
//     console.log(contents);

//     return (
//       <div id="main" className="row container">
//         {contentId ? (
//           <Content contentId={contentId} />
//         ) : (
//           <Contents contents={contents} />
//         )}
//       </div>
//     );
//   }
// }

const Contents = ({ contents, name, handleName, update, deleteContent }) => {
  return (
    <div id="main">
      <header>
        <h1>Packing App</h1>
      </header>
      <div id="contents">
        <h3>What Do You Need</h3>
        <form onSubmit={update}>
          <input
            type="text"
            placeholder="put it here"
            value={name}
            onChange={handleName}
          ></input>

          <button id="pack" type="submit">
            Pack it
          </button>
        </form>
      </div>

      <div id="bag">
        <h1>In Your Bag</h1>
        {contents.map((content) => {
          return (
            <ul key={content.id}>
              <a href={`#${content.id}`}>
                {content.name}
                <div>
                  <button
                    className="remove"
                    onClick={() => {
                      deleteContent(content.id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </a>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

// const Suitcases = ({ suitcases }) => {
//   console.log(suitcases);
//   return (
//     <div>
//       <h1>Lugages</h1>
//       <div>
//         <ul>
//           {suitcases.map((suitcase) => {
//             return (
//               <li key={suitcase.id}>
//                 <a href={`#${suitcase.id}`}>{suitcase.name}</a>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// };

// name state in my component

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      contents: [],
      // suitcases: [],
      contentId: "",
      name: "",
    };
    this.handleName = this.handleName.bind(this);
    this.update = this.update.bind(this);
    this.deleteContent = this.deleteContent.bind(this);
    this.darkModeHandler = this.darkModeHandler.bind(this);
  }

  async componentDidMount() {
    this.setState({ contents: (await Axios.get("/api/contents")).data });
    // this.setState({ suitcases: (await Axios.get("/api/suitcases")).data });
    window.addEventListener("hashchange", () => {
      this.setState({ contentId: window.location.hash.slice(1) });
    });
    this.setState({ contentId: window.location.hash.slice(1) }); //this changes the hash or removes it after it reloads
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  async update(event) {
    event.preventDefault(); // stops it from refreshing the page
    const newItem = (await Axios.post("/api/", { name: this.state.name })).data;
    this.setState({
      contents: [...this.state.contents, newItem],
    });
  }

  deleteContent(id) {
    //non destrcu
    let contents = this.state.contents.filter((content) => {
      return content.id !== id;
    });
    this.setState({
      contents: contents,
    });
    // console.log(contents);

    console.log(contents);
  }

  darkModeHandler() {
    this.setState({
      darkMode: !this.state.darkMode,
    });
  }

  render() {
    const { contents, contentId, name } = this.state;
    // console.log(suitcases);
    let buttonStyle = {
      padding: "10px",
      border: "1px solid #000000",
      borderRadius: "10px",
      outline: "none",
      display: "block",
      margin: "10px auto",
      fontSize: "100%",
    };

    let bColor = {
      backgroundColor: "#ffffff",
      color: "#000000",
      height: "100vh",
    };

    if (this.state.darkMode) {
      // console.log("dark");

      bColor = {
        backgroundColor: "#2d3436",
        color: "#ffffff",
        height: "100vh",
      };
    }

    let buttonClasses = [];
    // Pushing bold class into the array

    buttonClasses.push("bold");
    // Checking the Mode and dynamically pushing a CSS class

    if (this.state.darkMode) {
      buttonClasses.push("green-bg", "black-font");
      //console.log(buttonClasses);
    } else {
      buttonClasses.push("orange-bg", "black-font");
      //console.log(buttonClasses);
    }

    return (
      <div id="main" className={bColor}>
        <Contents
          contents={contents}
          name={name}
          handleName={this.handleName}
          update={this.update}
          deleteContent={this.deleteContent}
        />
        {/* <Suitcases suitcases={suitcases} /> */}
        <button
          style={buttonStyle}
          onClick={this.darkModeHandler}
          className={buttonClasses.join(" ")}
        >
          {this.state.darkMode ? "Light" : "Dark"}
          Mode
        </button>
      </div>
    );
  }
}

// class Suitcase extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       suitcase: {},
//     };
//   }

//   async componentDidMount() {
//     this.setState({
//       suitcase: (await Axios.get(`/api/suitcases/${this.props.suitcaseId}`))
//         .data,
//     });
//   }

//   render() {
//     const { suitcase } = this.state;
//     if (!suitcase.id) {
//       return "...loading";
//     }
//     return (
//       <div>
//         <a href="#">All Suitcases</a>
//         <h1>{suitcase.name}</h1>
//         {/* <h2>{suitcase.contents.name}</h2> */}

//         {/* <ul>
//           {suitcase.contents.map((content) => {
//             return <li key={content.id}>{content.name}</li>;
//           })}
//         </ul> */}
//       </div>
//     );
//   }
// }

// //this loads all the albums

// const Suitcases = ({ suitcases }) => {
//   return (
//     <div>
//       <h1>Type Of Bags</h1>
//       <ul>
//         {suitcases.map((suitcase) => {
//           return (
//             <li key={suitcase.id}>
//               <a href={`#${suitcase.id}`}>{suitcase.name}</a>
//             </li>
//           );
//         })}
//       </ul>

//       {/* <h1>Things To Pack</h1>
//       <ul>
//         {suitcases.contents.map((content) => {
//           return (
//             <li key={content.id}>
//               <a href={`#${content.id}`}>{content.name}</a>
//             </li>
//           );
//         })}
//       </ul> */}
//     </div>
//   );
// };

// export default class Main extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       suitcases: [],
//       suitcaseId: "",
//     };
//   }

//   async componentDidMount() {
//     this.setState({ suitcases: (await Axios.get("/api/suitcases")).data });
//     window.addEventListener("hashchange", () => {
//       this.setState({ suitcaseId: window.location.hash.slice(1) });
//     });
//     this.setState({ suitcaseId: window.location.hash.slice(1) }); //this changes the hash or removes it after it reloads
//   }

//   render() {
//     const { suitcases, suitcaseId } = this.state;
//     console.log(suitcases);

//     return (
//       <div id="main" className="row container">
//         {suitcaseId ? (
//           <Suitcase suitcaseId={suitcaseId} />
//         ) : (
//           <Suitcases suitcases={suitcases} />
//         )}
//       </div>
//     );
//   }
// }
