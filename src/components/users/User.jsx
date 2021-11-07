import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../layout/Spinner";
import { Fragment } from "react/cjs/react.production.min";

const User = (props) => {
  const {login} = useParams();
  const [user, setUser] = useState();
  const [repos, setRepos] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUser(login);
  }, []);

  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const rep = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&cclient_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(res.data);
    setRepos(rep.data);
    setLoading(false);
  };
  

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back To Search {console.log(user)}
      </Link>
      Hireable:{' '}
      {user.hireable ? (
        <i className="fas fa-check"/>
      ) : (
        <i className="fas fa-check"/>
      )}
      <div className="card user-card-bg grid-2">
        <div className="all-center">
          <img src={user.avatar_url} className="round-img" style={{width:'150px'}} alt="" />
          <h1>{user.name}</h1>
          <p>Location: {user.location}</p>
        </div>
        <div>
          {user.bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{user.bio}</p>
            </Fragment>
          )
          }
          <a href={user.html_url} className="btn btn-dark my-1">
            Visite Github Profile
          </a>
          <ul>
            <li>
              {login && 
              <Fragment>
                <strong>Username: </strong>
                {user.login}
              </Fragment>}
            </li>
            <li>
              {user.company && 
              <Fragment>
                <strong>Company: </strong>
                {user.company}
              </Fragment>}
            </li>
            <li>
              {user.blog && 
              <Fragment>
                <strong>Blog: </strong>
                {user.blog}
              </Fragment>}
            </li>
            <li>
              {user.website && 
              <Fragment>
                <strong>Website: </strong>
                {user.website}
              </Fragment>}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {user.followers}</div>
        <div className="badge badge-success">Following: {user.following}</div>
        <div className="badge badge-light">Public Repos: {user.public_repos}</div>
        <div className="badge badge-dark">Public Gists: {user.public_gists}</div>
      </div>
      <div className='card'>
      <h3>
        {repos.map(repo=>
          <div className='card rep-bg'>
          <h3>
            <a href={repo.html_url}>{repo.name}</a>
          </h3>
        </div>
          )}
      </h3>
    </div>
    </Fragment>
  );
};

export default User;
