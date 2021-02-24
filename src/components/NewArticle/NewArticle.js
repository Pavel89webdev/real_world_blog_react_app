import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import actionsCreators from '../../services/actionsCreators';

import { TextInput, TextArea, TagInput } from '../formInputs';
import Button from '../Button';

import classes from './NewArticle.module.sass';

let tagsCount = 1;

function NewArticle({ createArticle }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
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

    createArticle(newArticle);
    // очищать поля в локал сторадже? (в ретерне юз эффекта в инпутах)???
  };

  const [tags, setTag] = useState([{ name: 'tag_1' }]);

  const addTag = () => {
    setTag([...tags, { name: `tag_${++tagsCount}` }]);
  };

  const deleteTag = (name) => setTag(tags.filter((item) => item.name !== name));

  const renderTagsInputs = () =>
    tags.map((item, index, tagsArr) => (
      <TagInput
        key={item.name}
        name={item.name}
        widthAddButton={index + 1 === tagsArr.length}
        onAdd={addTag}
        onDelete={deleteTag}
        ref={register}
      />
    ));

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.title}>Create new article</div>
      <div className={classes['input-title']}>Title</div>
      <TextInput name="title" placeholder="Title" required ref={register} />
      <div className={classes['input-title']}>Short description</div>
      <TextInput name="description" placeholder="Description" required ref={register} />
      <div className={classes['input-title']}>Text</div>
      <TextArea name="body" placeholder="Text" required ref={register} />
      <div className={classes['input-title']}>Tags</div>

      {renderTagsInputs()}
      <Button submit style={['blue', 'half-wide']} /* loading */>
        Send
      </Button>
    </form>
  );
}

NewArticle.propTypes = {
  createArticle: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  createArticle: (article) => actionsCreators.createArticle(dispatch, article),
});

export default connect(null, mapDispatchToProps)(NewArticle);
