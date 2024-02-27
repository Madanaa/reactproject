//import Component from "./Component";
function Users() {
    return (
      <div className="Users">
        <h1>Hello React </h1>
        <Component/>
      </div>
    );
  }
  
  function Component() {
    return(
        <div>
            <h1>Hello Component</h1>
        <h1>Hello Madan</h1>
        </div>
    )
  }
  export default Users;