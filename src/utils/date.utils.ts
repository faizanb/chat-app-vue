const dateTimeConvertor = (timeStamp: Date) => {
  let date = new Date(timeStamp);
  let today = new Date();

  let diffDays = today.getDate() - date.getDate();
  let diffMonths = today.getMonth() - date.getMonth();
  let diffYears = today.getFullYear() - date.getFullYear();
  let dateString = '';

  if (diffYears === 0 && diffDays === 0 && diffMonths === 0) {
    dateString = 'Today';
  } else if (diffYears === 0 && diffDays === 1) {
    dateString = 'Yesterday';
  } else if (diffYears === 0 && diffDays > 1 && diffDays < 4) {
    return `${diffDays} days ago`;
  } else {
    dateString = date.toDateString();
  }

  let timeString = date.toLocaleTimeString('en-US').split(' ');
  let timeSplit = timeString[0].split(':');
  timeSplit.pop();
  let finalTmString = `${timeSplit.join(':')} ${timeString[1]}`;

  return `${dateString}, ${finalTmString}`;
};

export { dateTimeConvertor };
