export function buildInterstInsights(
  customers: {
    interests: string[];
  }[],
) {
  const interestCount: Record<string, number> = {};

  customers.forEach((customer) => {
    customer.interests.forEach((interest) => {
      interestCount[interest] = (interestCount[interest] || 0) + 1;
    });
  });

  const sorted = Object.entries(interestCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  return sorted.map(([interest, count]) => ({ interest, count }));
}
