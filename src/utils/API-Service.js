/**
 * Functon for get data from an url
 * @param url
 * @returns {Promise<any>}
 */
export const get = async(url) =>{
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Data error');
    return response.json();
  }catch (err) {
    console.error(err);
  }
};