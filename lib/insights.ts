export type InterestInsight = {
  interest: string;
  count: number;
};

export function buildInterestInsights(customers: any[]): InterestInsight[] {
  const map: Record<string, number> = {};

  customers.forEach((customer) => {
    if (!customer.interests) return;

    customer.interests.forEach((interest: string) => {
      map[interest] = (map[interest] || 0) + 1;
    });
  });

  const insights = Object.entries(map)
    .map(([interest, count]) => ({
      interest,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  return insights.slice(0, 5);
}
