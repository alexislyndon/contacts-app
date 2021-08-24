const db = require("./db");

module.exports = async (id) => {
  //const { id } = req.params;

  const result = await db.query(
    `SELECT p.p_id id, p.firstname, p.lastname, p.emailaddresses, 
      
    json_agg(

      json_build_object(
        'pa_id', pa.pa_id,
        'street', pa.street,
        'city',pa.city,
        'zipcode', pa.zipcode
      )
    ) postaladdresses
    
    FROM people p
    
   LEFT JOIN postaladdresses pa  

    ON p.p_id = pa.p_id
    
    WHERE p.p_id=$1
    
    GROUP BY p.p_id, p.firstname, p.lastname, p.emailaddresses`,
    [id]
  );

  const data = result.rows[0];

  return data;
};
