export async function runInitialProfileAndJobAnalysis<TProfile, TJob>(args: {
  profileTask: () => Promise<TProfile>;
  jobTask: () => Promise<TJob>;
}) {
  const [profile, job] = await Promise.all([args.profileTask(), args.jobTask()]);
  return { profile, job };
}
