import amazonPaapi from 'amazon-paapi';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { asin } = req.query;

  if (!asin || typeof asin !== 'string') {
    return res.status(400).json({ error: 'ASIN parameter is required and must be a string' });
  }

  const commonParameters = {
    AccessKey: process.env.AMAZON_ACCESS_KEY,
    SecretKey: process.env.AMAZON_SECRET_KEY,
    PartnerTag: process.env.AMAZON_PARTNER_TAG || 'boomtick-20',
    PartnerType: 'Associates',
    Marketplace: 'www.amazon.com',
  };

  const requestParameters = {
    ItemIds: [asin],
    Resources: [
      'Offers.Listings.Price',
      'Images.Primary.Medium',
      'ItemInfo.Title'
    ],
  };

  try {
    const data = await amazonPaapi.getItems(commonParameters, requestParameters);

    // Amazon PA-API 5.0 returns ItemsResult for GetItems
    const items = data.ItemsResult?.Items || data.SearchResult?.Items;

    if (items && items.length > 0) {
      const item = items[0];
      const priceString = item.Offers?.Listings?.[0]?.Price?.DisplayAmount;
      const title = item.ItemInfo?.Title?.DisplayValue;

      return res.status(200).json({ price: priceString, title });
    } else {
      return res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Amazon API Error:', error);
    return res.status(500).json({ error: 'Failed to fetch dynamic product data' });
  }
}
