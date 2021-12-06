import createError from 'http-errors';

export const reverseVotesOnUp = (type) => {
  [type].upVotes += 1;
  [type].downVotes -= 1;
};
export const reverseVotesOnDown = (type) => {
  [type].upVotes -= 1;
  [type].downVotes += 1;
};

export const handleUserVotes = (id, user, action, type) => {
  const hasUpVoted = user[type].upVoted.some((item) => item.equals(id));
  const hasDownVoted = user[type].downVoted.some((item) => item.equals(id));

  if (action !== 'up' && action !== 'down') throw new createError.BadRequest();

  action === 'up' ? user[type].downVoted.pull(id) : user[type].upVoted.pull(id);
  if (!hasUpVoted && !hasDownVoted)
    action === 'up'
      ? user[type].upVoted.push(id)
      : user[type].downVoted.push(id);
  if (!hasUpVoted && hasDownVoted)
    action === 'up'
      ? user[type].upVoted.push(id)
      : user[type].downVoted.pull(id);
  if (hasUpVoted && !hasDownVoted)
    action === 'up'
      ? user[type].upVoted.pull(id)
      : user[type].downVoted.push(id);

  return { hasUpVoted, hasDownVoted };
};
