const db = require("./db");
const { v4: uuid } = require("uuid");

module.exports = async ({
  firstname,
  lastname,
  emailaddresses,
  postaladdresses,
  id,
}) => {
  if (typeof emailaddresses === "string") {
    emailaddresses = [emailaddresses].filter(Boolean);
  }

  if (!id) {
    id = uuid();

    const result = await db.query(
      `INSERT INTO people (firstname, lastname, emailaddresses, p_id) 
            VALUES ($1,$2, $3, $4)`,
      [firstname, lastname, emailaddresses, id]
    );
  } else {
    await db.query(
      `UPDATE people SET firstname=$1, lastname=$2, emailaddresses=$4 where p_id=$3`,
      [firstname, lastname, id, emailaddresses]
    );
  }

  postaladdresses = postaladdresses.filter(Boolean)

  const pa_ids = postaladdresses?.map(i => i.pa_id).filter(Boolean).map(i => `'${i}'`).join(',')

  if(!pa_ids) {

    await db.query(

      `DELETE FROM postaladdresses WHERE p_id=$1`, [id]
    )
  }
  else {

    await db.query(
  
        `DELETE FROM postaladdresses WHERE pa_id NOT IN (${pa_ids})`
    )
  }


  postaladdresses.forEach(async ({ pa_id, street, city, zipcode }) => {
    if (!pa_id) {
      pa_id = uuid();
      await db.query(
        `INSERT INTO postaladdresses(pa_id,p_id,street,city,zipcode)
        VALUES ($1,$2,$3,$4,$5)
        `,
        [pa_id, id, street, city, zipcode]
      );
      return;
    }
    await db.query(
      `UPDATE postaladdresses SET street=$1, city=$2, zipcode=$3 WHERE pa_id=$4 `,
      [street, city, zipcode, pa_id]
    );
  });

  return { p_id: id };
};
