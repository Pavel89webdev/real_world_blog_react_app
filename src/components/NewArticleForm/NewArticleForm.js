import React from 'react';
import PropTypes from 'prop-types';

import { Input, TextArea, TagInput } from '../formInputs';
import TagsBar from '../TagsBar';
import Button from '../Button';

import classes from './NewArticleForm.module.sass';

const NewArticleForm = React.forwardRef(
  (
    {
      onSubmit,
      title,
      inputTitle,
      errorMessageTitle,
      setInputTitle,
      inputDescription,
      errorMessageDescription,
      setInputDescription,
      inputBody,
      errorMessageBody,
      setInputBody,
      tagsArr,
      onDeleteTag,
      onAddTag,
      inputTag,
      setInputTag,
      tagError,
      loading,
    },
    ref
  ) => (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
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
        ref={ref}
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
        ref={ref}
      />
      <div className={classes['input-title']}>Text</div>
      <TextArea
        name="body"
        placeholder="Text"
        required
        ref={ref}
        value={inputBody}
        minLength="1"
        errorMessage={errorMessageBody}
        onInput={setInputBody}
      />
      <div className={classes['input-title']}>Tags</div>
      <TagsBar tagsArr={tagsArr} onClick={onDeleteTag} />
      <TagInput
        onAdd={onAddTag}
        value={inputTag}
        onInput={(text) => {
          setInputTag(text.trim());
        }}
        errorMessage={tagError}
      />
      <Button
        type="submit"
        addClasses={['blue', 'half-wide']}
        loading={loading}
        disabled={loading}
      >
        Send
      </Button>
    </form>
  )
);

NewArticleForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  inputTitle: PropTypes.string,
  errorMessageTitle: PropTypes.string,
  setInputTitle: PropTypes.func.isRequired,
  inputDescription: PropTypes.string,
  errorMessageDescription: PropTypes.string,
  setInputDescription: PropTypes.func.isRequired,
  inputBody: PropTypes.string,
  errorMessageBody: PropTypes.string,
  setInputBody: PropTypes.func.isRequired,
  tagsArr: PropTypes.array,
  onDeleteTag: PropTypes.func.isRequired,
  onAddTag: PropTypes.func.isRequired,
  inputTag: PropTypes.string,
  setInputTag: PropTypes.func.isRequired,
  tagError: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

NewArticleForm.defaultProps = {
  title: '',
  inputTitle: '',
  errorMessageTitle: '',
  inputDescription: '',
  errorMessageDescription: '',
  inputBody: '',
  errorMessageBody: '',
  tagsArr: [],
  inputTag: '',
  tagError: '',
};

export default NewArticleForm;
