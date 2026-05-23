const courses = [
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    completed: true
  },

  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    completed: true
  },

  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    completed: false
  },

  {
    subject: "CSE",
    number: 110,
    title: "Programming Building Blocks",
    credits: 2,
    completed: true
  },

  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    completed: true
  }
];

const courseContainer = document.querySelector('#courseContainer');

function displayCourses(courseList) {

  courseContainer.innerHTML = '';

  courseList.forEach(course => {

    const div = document.createElement('div');

    div.classList.add('course-card');

    if (course.completed) {
      div.classList.add('completed');
    }

    div.innerHTML = `
      ${course.subject} ${course.number}
    `;

    courseContainer.appendChild(div);
  });

  const credits = courseList.reduce(
    (total, course) => total + course.credits,
    0
  );

  document.querySelector('#totalCredits').textContent = credits;
}

displayCourses(courses);

document.querySelector('#all').addEventListener('click', () => {
  displayCourses(courses);
});

document.querySelector('#wdd').addEventListener('click', () => {
  const wddCourses = courses.filter(course => course.subject === 'WDD');
  displayCourses(wddCourses);
});

document.querySelector('#cse').addEventListener('click', () => {
  const cseCourses = courses.filter(course => course.subject === 'CSE');
  displayCourses(cseCourses);
});