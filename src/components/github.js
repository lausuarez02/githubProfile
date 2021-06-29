import React, {useState} from "react";

import "./github.css"

const GitHub = () => {  
    const [data, setData] = useState({});
    const [username, setUsername] = useState("");
    const [repositories, setRepositories] = useState([]);
    const [search, serSearch] = useState("")
    

   /* const filterr = repositories.filter(rep => {
      rep.name.toLowerCase().includes(search.toLowerCase())})*/
      

     /* const handleChange = e => {
        setSearch(e.target.value);
      };*/
         

    const onChangeHandler = e => {
        setUsername(e.target.value);
      };

    const handleSubmit = async e => {
    e.preventDefault();


    const profile = await fetch(`https://api.github.com/users/${username}`);
    const profileJson = await profile.json();
    
    const repositories = await fetch(profileJson.repos_url);
    const repoJson = await repositories.json();
    console.log(repoJson);

    if(profileJson){
        setData(profileJson);
        setRepositories(repoJson);

    }
};
    return(
        <div style={{padding:10,}} className="container" >
          
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid"  style={{backgroundColor:"black", borderRadius:"20px"}}>
    <img class="navbar-brand" src={"https://github.githubassets.com/images/modules/logos_page/Octocat.png"} style={{width:"100px", height:"100px"}} />
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">GitHub</a>
        </li>
      </ul>
      <form class="d-flex">
      <input
           
           class="form-control me-2" type="search" placeholder="Search"
           value={username}
           onChange={onChangeHandler}/>
     
     <button 
            type="submit"
            onClick={handleSubmit}
            class="btn btn-outline-success"
            >
                Search
            </button>
      </form>
    </div>
  </div>
</nav>
<div className="containerPrincipal"  style={{backgroundColor:"red"}}>
<div class="card mb-3" style={{maxWidth: "540px", backdgroundColor:"red"}}>
  <div class="row g-0" style={{ backdgroundColor:"red"}}>
    <div class="col-md-4" style={{ backdgroundColor:"red"}}>
      <img src={data.avatar_url} class="img-fluid rounded-start"  alt={data.avatar_url}/>
    </div>
    <div class="col-md-8" style={{ backdgroundColor:"red"}}>
      <div class="card-body" style={{ backdgroundColor:"red"}}>
        <h5 class="card-title" style={{ backdgroundColor:"red"}}>{data.name}</h5>
        <p class="card-text">{data.bio}</p>
        <p class="card-text"><small class="text-muted">{data.location}</small></p>
      </div>
    </div>
  </div>
</div>

            <div class="card" style={{width: "18rem"}}>
           

     <h2>Repositories</h2>
      {repositories.map(repo => (
      <ol class="list-group " key={repo.name}>
  <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold"> <a href={repo.repos_url}>{repo.name}</a></div>
    
    </div>

  </li>

</ol>))}
</div>
      
     
   
</div>
        </div>
    )
}

export default GitHub;