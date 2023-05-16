const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/lawyer_review_system_development",
      test: "postgres://postgres:postgres@localhost:5432/lawyer_review_system_test",
      e2e: "postgres://postgres:postgres@localhost:5432/lawyer_review_system_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
