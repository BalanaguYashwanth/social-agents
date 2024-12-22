const getAPICredits = async ({ userFid, ownerFid }: { userFid: number; ownerFid: number }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEMP_API_URL}/trade/${userFid}/${ownerFid}.json`
  );
  const data = await response.json();
  return Number(data?.credits);
};

const updateAPICredits = async ({
  userFid,
  ownerFid,
  amount,
}: {
  userFid: number;
  ownerFid: number;
  amount: number;
}) => {
  const credits = (await getAPICredits({ userFid, ownerFid })) || 0;
  const totalCredits = credits + amount * 10;
  const response = await fetch(`${process.env.NEXT_PUBLIC_TEMP_API_URL}/trade/${userFid}.json`, {
    method: 'PATCH',
    body: JSON.stringify({
      [ownerFid]: {
        credits: totalCredits,
      },
    }),
  });
  const data = await response.json();
  return { data, credits: totalCredits };
};

const sellAPICredits = async ({
  userFid,
  ownerFid,
  creditsAmount,
}: {
  userFid: number;
  ownerFid: number;
  creditsAmount: number;
}) => {
  const credits = (await getAPICredits({ userFid, ownerFid })) || 0;
  const remainingCredits = credits - creditsAmount;
  const response = await fetch(`${process.env.NEXT_PUBLIC_TEMP_API_URL}/trade/${userFid}.json`, {
    method: 'PATCH',
    body: JSON.stringify({
      [ownerFid]: {
        credits: remainingCredits,
      },
    }),
  });
  const data = await response.json();
  return { data, credits: remainingCredits };
};

const reduceAPICredits = async ({ userFid, ownerFid }: { userFid: number; ownerFid: number }) => {
  const credits = await getAPICredits({ userFid, ownerFid });
  console.log('credits', credits);
  if (!credits || Number(credits) <= 1) {
    return false;
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEMP_API_URL}/trade/${userFid}/${ownerFid}.json`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        credits: credits - 1,
      }),
    }
  );
  const data = await response.json();
  return data;
};

export { updateAPICredits, getAPICredits, reduceAPICredits, sellAPICredits };
