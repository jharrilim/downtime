import React from 'react';
import { Post } from './Post';
import moment from 'moment';
import { traceOrDate } from '../../util/time';

export default {
  title: 'Post',
  component: Post,
};


export const PostStory = () =>
  <Post
    author={'Joseph Harrison-Lim'}
    content={'This is a story for a post. Posts are elements which contain author\'s content.'}
    date={traceOrDate(moment())()}
    title={'Post Story'}
  />;

PostStory.stories = {
  title: 'Post'
};