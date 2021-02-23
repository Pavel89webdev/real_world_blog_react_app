import React from 'react';

import { TextInput } from '../formInputs';

import classes from './NewArticle.module.sass';

function NewArticle() {
  return (
    <div className={classes.form}>
      <div className={classes.title}>Create new article</div>
      <div className={classes['input-title']}>Title</div>
      <TextInput name="title" placeholder="Title" required />
    </div>
  );
}

export default NewArticle;
