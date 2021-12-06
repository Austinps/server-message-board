export const reverseVotesOnUp = (type) => {
  [type].upVotes += 1;
  [type].downVotes -= 1;
};
export const reverseVotesOnDown = (type) => {
  [type].upVotes -= 1;
  [type].downVotes += 1;
};
