import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux'; // like, unlike, remove post gibi işlemler için

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  auth,
}) => {
  return (
    <div class='post bg-white p-1 my-1' style={{ borderRadius: '25px' }}>
      <div>
        <Link>
          <img class='round-img' src={avatar} alt='' />
          <h4> {name} </h4>
        </Link>
      </div>
      <div>
        <p class='my-1'>{text}</p>
        <p class='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>{' '}
        </p>
        <button type='button' class='btn btn-light'>
          <i class='fas fa-thumbs-up' />
          {likes.length > 0 && <span> {likes.length} </span>}
        </button>
        <button type='button' class='btn btn-light'>
          <i class='fas fa-thumbs-down'></i>
        </button>
        <Link to={`/post/${_id}`} class='btn btn-primary'>
          Discussion{' '}
          {comments.length > 0 && (
            <span class='comment-count'> {comments.length} </span>
          )}
        </Link>
        {!auth.loading && auth.user._id === user && (
          <button type='button' class='btn btn-danger' title='Remove'>
            <i class='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired, // Ana comp olan Post comp dan geldi, state(store) dan değil. o yüzden mapStateToProps da yok
  auth: PropTypes.object.isRequired, // store dan geldi
};

const mapStateToProps = (state) => ({
  auth: state.auth, // for authenticated user info..
});

export default connect(mapStateToProps, {})(PostItem);
