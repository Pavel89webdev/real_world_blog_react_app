import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actionsCreatorsArticle } from '../../redux/redusers/articles';

import NewArticleForm from '../../components/NewArticleForm';

import {
  validationTitle,
  validationDescription,
  validationBody,
} from '../../helpers/validation';

const addTag = (tagsArr = [], tag, setTagError, setTagsArr, setInputTag) => {
  const isUniqe = tagsArr.includes(tag) === false;
  if (isUniqe === true) setTagError('');
  if (isUniqe === false) setTagError('this tag is already added');
  if (tag !== '' && isUniqe) {
    setTagsArr([...tagsArr, tag]);
    setInputTag('');
  }
};

function NewArticleContainer({
  id,
  articleTitle,
  articleDescription,
  articleBody,
  title,
  createArticle,
  updateArticle,
  loading,
  justCreatedArticle,
  clearJustCreateArticle,
  history,
  articleTagList,
}) {
  const { register, handleSubmit } = useForm();

  const [inputTitle, setInputTitle] = useState(articleTitle);
  const [errorMessageTitle, setErrorMessageTitle] = useState('');

  const [inputDescription, setInputDescription] = useState(articleDescription);
  const [errorMessageDescription, setErrorMessageDescription] = useState('');

  const [inputBody, setInputBody] = useState(articleBody);
  const [errorMessageBody, setErrorMessageBody] = useState('');

  const [inputTag, setInputTag] = useState('');
  const [tagError, setTagError] = useState('');

  const [tagsArr, setTagsArr] = useState([...articleTagList]);

  const onAddTag = useCallback(() => {
    addTag(tagsArr, inputTag, setTagError, setTagsArr, setInputTag); // вот как тут лучше с useCallback или можно было обойтись одной функцией из замыкания и все?
  }, [tagsArr, inputTag, setTagError, setTagsArr, setInputTag]);

  if (justCreatedArticle) {
    clearJustCreateArticle();
    history.push(`/article/${justCreatedArticle}`);
    return null;
  }

  const onDeleteTag = (tag) => {
    setTagsArr(tagsArr.filter((item) => item !== tag));
  };

  const onSubmit = (data) => {
    if (
      !validationTitle(inputTitle, setErrorMessageTitle) ||
      !validationDescription(inputDescription, setErrorMessageDescription) ||
      !validationBody(inputBody, setErrorMessageBody)
    ) {
      return;
    }

    const newArticle = {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: tagsArr,
    };

    if (id !== '') {
      updateArticle(newArticle, id);
      return;
    }
    createArticle(newArticle);
  };

  return (
    <NewArticleForm
      onSubmit={handleSubmit(onSubmit)}
      title={title}
      inputTitle={inputTitle}
      errorMessageTitle={errorMessageTitle}
      setInputTitle={setInputTitle}
      inputDescription={inputDescription}
      errorMessageDescription={errorMessageDescription}
      setInputDescription={setInputDescription}
      inputBody={inputBody}
      errorMessageBody={errorMessageBody}
      setInputBody={setInputBody}
      tagsArr={tagsArr}
      onDeleteTag={onDeleteTag}
      onAddTag={onAddTag}
      inputTag={inputTag}
      setInputTag={setInputTag}
      tagError={tagError}
      loading={loading}
      ref={register}
    />
  );
}

NewArticleContainer.propTypes = {
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
  id: PropTypes.string,
  articleTagList: PropTypes.array,
};

NewArticleContainer.defaultProps = {
  justCreatedArticle: '',
  title: 'Create new article',
  articleTitle: '',
  articleDescription: '',
  articleBody: '',
  id: '',
  articleTagList: [],
};

const mapStateToProps = (state) => ({
  loading: state.isFetching,
  isLoggin: state.user.isLoggin,
  justCreatedArticle: state.articles.newArticle || '',
});

const mapDispatchToProps = (dispatch) => ({
  createArticle: (article) =>
    actionsCreatorsArticle.createArticle(dispatch, article),
  updateArticle: (article, id) =>
    actionsCreatorsArticle.updateArticle(dispatch, article, id),
  clearJustCreateArticle: () =>
    dispatch(actionsCreatorsArticle.clearJustCreateArticle()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewArticleContainer)
);
