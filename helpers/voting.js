import createError from 'http-errors';

export const handleDocumentVote = (req, doc) => {
    const { hasUpVoted, hasDownVoted } = req.userVote;
    const { action } = req.params;

    if (!hasUpVoted && !hasDownVoted)
        action === 'up' ? (doc.upVotes += 1) : (doc.downVotes += 1);
    if (!hasUpVoted && hasDownVoted)
        if (action === 'up') {
            doc.upVotes += 1;
            doc.downVotes -= 1;
        } else {
            doc.downVotes -= 1;
        }
    if (hasUpVoted && !hasDownVoted)
        if (action === 'up') {
            doc.upVotes -= 1;
        } else {
            doc.upVotes -= 1;
            doc.downVotes += 1;
        }

    return doc;
};

export const handleUserVote = (id, user, action, type) => {
    const hasUpVoted = user[type].upVoted.some((item) => item.equals(id));
    const hasDownVoted = user[type].downVoted.some((item) => item.equals(id));

    if (action !== 'up' && action !== 'down')
        throw new createError.BadRequest();

    action === 'up'
        ? user[type].downVoted.pull(id)
        : user[type].upVoted.pull(id);

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
