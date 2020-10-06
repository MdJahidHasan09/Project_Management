import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getUserByUserName } from "../../actions/auth-action";
import { useHttpClient } from "../../hooks/http-hook";

import './Profile.css';

const Profile = ({ match, loadedUser, getUserByUserName, auth: { user, isAuthenticated} }) => {
    const { sendRequest } = useHttpClient();
    const [ showUser, setShowUser ] = useState(user);
    useEffect(() => {
        if(match.params && match.params.username) {
            getUserByUserName(match.params.username, sendRequest);
            setShowUser(loadedUser);
            console.log(match.params.username);
        }

    }, []);
    return (
        <div className="main">
            {isAuthenticated && (
                <>
                    <div className="row profile">
                        <img className="profile_avatar"
                             src= {loadedUser
                                 ? (loadedUser?.profileImage?.imageUrl)
                                 : (user?.profileImage?.imageUrl)
                             }
                             alt="no image"/>
                        <h4>
                            {loadedUser
                                ? (loadedUser.name)
                                : (user && user.name)
                            }
                        </h4>
                        <p className="lead">{loadedUser
                            ? (loadedUser.role)
                            : (user && user.role)
                        } </p>
                        <p className="lead">{loadedUser
                            ? (loadedUser.email)
                            : (user && user.email)
                        } </p>
                        <div className="icons my-1">
                            {user && user.social && user.social.twitter && (
                                <a href={user.social.twitter} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-twitter fa-2x" />
                                </a>
                            )}
                            {loadedUser
                                ? (loadedUser && loadedUser.social && loadedUser.social.github && (
                                    <a href={loadedUser.social.github} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-github fa-2x" />
                                    </a>
                                ))
                                : (user && user.social && user.social.github && (
                                    <a href={user.social.github} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-github fa-2x" />
                                    </a>
                                ))
                            }
                            {loadedUser
                                ? (loadedUser && loadedUser.social && loadedUser.social.facebook && (
                                    <a href={loadedUser.social.facebook} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-facebook-f fa-2x" />
                                    </a>
                                ))
                                : (user && user.social && user.social.facebook && (
                                    <a href={user.social.facebook} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-facebook-f fa-2x" />
                                    </a>
                                ))
                            }
                            {loadedUser
                                ? (loadedUser && loadedUser.social && loadedUser.social.linkedIn && (
                                    <a href={loadedUser.social.linkedIn} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-linkedin fa-2x" />
                                    </a>
                                ))
                                : (user && user.social && user.social.linkedIn && (
                                    <a href={user.social.linkedIn} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-linkedin fa-2x" />
                                    </a>
                                ))
                            }
                            {loadedUser
                                ? (loadedUser && loadedUser.social && loadedUser.social.stackoverflow && (
                                    <a href={loadedUser.social.stackoverflow} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-stack-overflow fa-2x" />
                                    </a>
                                ))
                                : (user && user.social && user.social.stackoverflow && (
                                    <a href={user.social.stackoverflow} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-stack-overflow fa-2x" />
                                    </a>
                                ))
                            }
                            {loadedUser
                                ? (loadedUser && loadedUser.social && loadedUser.social.youtube && (
                                    <a href={loadedUser.social.youtube} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-youtube fa-2x" />
                                    </a>
                                ))
                                : (user && user.social && user.social.youtube && (
                                    <a href={user.social.youtube} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-youtube fa-2x" />
                                    </a>
                                ))
                            }
                            {loadedUser
                                ? (loadedUser && loadedUser.social && loadedUser.social.instagram && (
                                    <a href={loadedUser.social.instagram} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-instagram fa-2x" />
                                    </a>
                                ))
                                : (user && user.social && user.social.instagram && (
                                    <a href={user.social.instagram} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-instagram fa-2x" />
                                    </a>
                                ))
                            }
                        </div>
                    </div>

                    {loadedUser
                        ? (loadedUser.bio && (
                            <div className="row profile profile-bio">
                                <h4>{loadedUser && loadedUser.name}'s Bio</h4>
                                <p>{loadedUser?.bio}</p>
                            </div>
                        ))
                        : (user && user.bio && (
                            <div className="row profile profile-bio">
                                <h4>{user && user.name}'s Bio</h4>
                                <p>{user.bio}</p>
                            </div>
                        ))
                    }

                    {loadedUser
                        ? (loadedUser.skills && loadedUser.skills.length > 0 && (
                            <div className="row profile profile-skills">
                                <h4 >Skill Set</h4>
                                <div className="skills">
                                    {loadedUser.skills.map((skill, index) => (
                                        <div key={index} className="skill">
                                            <i className="fas fa-check" /> {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                        : (user && user.skills && user.skills.length > 0 && (
                            <div className="row profile profile-skills">
                                <h4 >Skill Set</h4>
                                <div className="skills wrapper">
                                    {user.skills.map((skill, index) => (
                                        <div key={index} className="skill">
                                            <i className="fas fa-check" /> {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    }
                    <div className="bottom-space" />
                </>
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    auth: state.auth,
    loadedUser: state.auth.loadedUser
})

export default connect(mapStateToProps, { getUserByUserName })(Profile);
