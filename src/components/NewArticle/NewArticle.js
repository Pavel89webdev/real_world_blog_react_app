import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import actionsCreators from '../../services/actionsCreators';

import { TextArea, TagInput, Input } from '../formInputs';
import Button from '../Button';

import classes from './NewArticle.module.sass';

let tagsCount = 1;

function NewArticle({
  id,
  articleTitle,
  articleDescription,
  articleBody,
  title,
  articleTagList,
  createArticle,
  updateArticle,
  loading,
  justCreatedArticle,
  clearJustCreateArticle,
  history,
}) {
  if (justCreatedArticle) {
    history.push(`/article/${justCreatedArticle}`);
    clearJustCreateArticle();
  }
  const { register, handleSubmit } = useForm();

  const [inputTitle, setInputTitle] = useState(articleTitle);
  const [errorMessageTitle, setErrorMessageTitle] = useState('');

  const [inputDescription, setInputDescription] = useState(articleDescription);
  const [errorMessageDescription, setErrorMessageDescriptio] = useState('');

  const [inputBody, setInputBody] = useState(articleBody);
  const [errorMessageBody, setErrorMessageBody] = useState('');

  const onSubmit = (data) => {
    if (inputTitle.length < 4) {
      setErrorMessageTitle('title must be longer than 3 letters');
      return;
    }
    if (inputTitle.length >= 4) {
      setErrorMessageTitle('');
    }
    if (inputDescription.length < 4) {
      setErrorMessageDescriptio('description must be longer that 3 letters');
      return;
    }
    if (inputDescription.length >= 4) {
      setErrorMessageDescriptio('');
    }
    if (inputBody.length < 4) {
      setErrorMessageBody('article must be longer that 3 letters');
      return;
    }
    if (inputBody.length >= 4) {
      setErrorMessageBody('');
    }

    const tagList = [];

    for (const key in data) {
      if (key.includes('tag', 0)) {
        tagList.push(data[key]);
      }
    }

    const newArticle = {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList,
    };

    if (id !== '') {
      updateArticle(newArticle, id);
      return;
    }
    createArticle(newArticle);
  };

  let commonTags = [{ name: 'tag_1', value: '' }];
  if (articleTagList.length > 0) {
    commonTags = articleTagList.map((item, i) => ({ name: `tag_${++i}`, value: item }));
  }

  const [tags, setTags] = useState(commonTags);

  const addTag = () => {
    setTags([...tags, { name: `tag_${++tagsCount}`, value: '' }]);
  };

  const changeTagValue = (value, name) => {
    const newTags = tags.map((item) => {
      if (item.name === name) item.value = value;
      return item;
    });
    setTags(newTags);
  };

  const deleteTag = (name) => {
    if (tags.length > 1) return setTags(tags.filter((item) => item.name !== name));
    return tags;
  };

  const renderTagsInputs = () =>
    tags.map((item, index, tagsArr) => (
      <TagInput
        key={item.name}
        name={item.name}
        widthAddButton={index + 1 === tagsArr.length}
        onAdd={addTag}
        onDelete={deleteTag}
        ref={register}
        value={item.value}
        onInput={(value) => {
          changeTagValue(value, item.name);
        }}
      />
    ));

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.title}>{title}</div>
      <div className={classes['input-title']}>Title</div>
      <Input
        name="title"
        placeholder="Tilte"
        required
        value={inputTitle}
        type="text"
        minLength="0"
        errorMessage={errorMessageTitle}
        onInput={setInputTitle}
        ref={register}
      />
      <div className={classes['input-title']}>Short description</div>
      <Input
        name="description"
        placeholder="Short description"
        required
        value={inputDescription}
        type="text"
        minLength="0"
        errorMessage={errorMessageDescription}
        onInput={setInputDescription}
        ref={register}
      />
      <div className={classes['input-title']}>Text</div>
      <TextArea
        name="body"
        placeholder="Text"
        required
        ref={register}
        value={inputBody}
        minLength="1"
        errorMessage={errorMessageBody}
        onInput={setInputBody}
      />
      <div className={classes['input-title']}>Tags</div>

      {renderTagsInputs()}
      <Button submit style={['blue', 'half-wide']} loading={loading}>
        Send
      </Button>
    </form>
  );
}

NewArticle.propTypes = {
  createArticle: PropTypes.func.isRequired,
  updateArticle: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  justCreatedArticle: PropTypes.string,
  history: PropTypes.object.isRequired,
  title: PropTypes.string,
  articleTitle: PropTypes.string,
  articleDescription: PropTypes.string,
  articleBody: PropTypes.string,
  clearJustCreateArticle: PropTypes.func.isRequired,
  articleTagList: PropTypes.array,
  id: PropTypes.string,
};

NewArticle.defaultProps = {
  justCreatedArticle: '',
  title: 'Create new article',
  articleTitle: '',
  articleDescription: '',
  articleBody: '',
  articleTagList: [],
  id: '',
};

const mapStateToProps = (state) => ({
  loading: state.isFetching,
  isLoggin: state.user.isLoggin,
  justCreatedArticle: state.articles.newArticle || '',
});

const mapDispatchToProps = (dispatch) => ({
  createArticle: (article) => actionsCreators.createArticle(dispatch, article),
  updateArticle: (article, id) => actionsCreators.updateArticle(dispatch, article, id),
  clearJustCreateArticle: actionsCreators.clearJustCreateArticle,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewArticle));
