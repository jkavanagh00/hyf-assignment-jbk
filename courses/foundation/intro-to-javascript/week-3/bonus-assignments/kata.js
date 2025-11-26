function match(candidate, job) {
  if (!candidate.minSalary || !job.maxSalary) {
    throw Error();
  } else {
    return candidate.minSalary * 0.9 <= job.maxSalary;
  }
}