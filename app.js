const campaignData = document.querySelector("#campaign-data");
const conversionData = document.querySelector("#conversion-data");
const conversionRates = document.querySelector("#conversion-rates");
const engagementData = document.querySelector("#engagement-data");
const spinnner = document.querySelector(".spinner");
axios
  .get("http://localhost:8080/api/google")
  .then((response) => {
    setTimeout(() => {
      const data = response.data.data[0];
      // console.log(data);

      const spinners = document.querySelectorAll(".spinner");
      for (const spinner of spinners) spinner.remove();

      for (let key in data) {
        if (key === "campaign") {
          campaignData.innerHTML = `
<div class="inner-data">
 <code> <b><i class="fa-regular fa-id-badge" style="font-size:1.1em;"></i> : <span style="font-size:1.3em;"> ${
   data[key].campaign_id
 }</span></b> </code> 
<br/>
  <span> <b>Name : ${data[key].name}</b> </span>
  <br/>
  <span> <b>Status : ${
    data[key].status == "ENABLED"
      ? '<i class="fa-solid fa-circle-check" style="color:green;"></i>'
      : '<i class="fa-solid fa-circle-xmark"  style="color:red;"></i>'
  } </b> </span>
<br/>
 <span> <b>Budget : ${data[key].budget.amount} ${
            data[key].budget.currency
          }</b> <i class="fa-solid fa-money-bill" style="color:green"></i></span>
<br/>

<span><b>Start Date -  ${
            data[key].start_date
          }</span> <i class="fa-solid fa-calendar-days"></i>


<br>
<span><b>Clicks -  ${
            data[key].clicks
          } <i class="fa-solid fa-check" style="color:green;"></i></span>
</div>
</b>
`;
        } else if (key === "conversion_data") {
          conversionData.innerHTML = `
<div class="inner-data">
  <b> <span>Keyword_</span>  <code><i class="fa-regular fa-id-badge" style="font-size:1.1em;"></i> : <span style="font-size:1.3em;"> ${data[key].keyword_id}</span></b> </code> 
<br/>
  <span> <b>Text : ${data[key].text}</b> </span>
  <br/>

  <span> <b>Type : ${data[key].match_type}</b> </span>
<br/>
 <span> <b>Cost : ${data[key].cost.amount} ${data[key].cost.currency}</b> <i class="fa-solid fa-money-bill" style="color:green"></i></span>
<br/>

<span><b>Impressions - <i class="fa-solid fa-clock"></i> ${data[key].impressions}</span>

<br>
<span><b>Clicks -  ${data[key].clicks} <i class="fa-solid fa-check" style="color:green;"></i></span>
</div>
</b>
`;
        } else if (key == "conversion_rate") {
          conversionRates.innerHTML = `
<div class="inner-data">
<b>   Conversions <i class="fa-solid fa-money-bill-transfer" style="color:green;"></i> : <span style="font-size:1.3em;"> ${data[key].conversions} </span></b> 
<br/>
  <span> <b>Conversion_rate : ${data[key].conversion_rate}</b> 
</span>
 
<br/>
 
 <span> <b>CPC : ${data[key].average_cpc.amount} ${data[key].average_cpc.currency}</b> <i class="fa-solid fa-money-bill" style="color:green"></i></span>
<br/>

<span><b>Position -  ${data[key].average_position}</span>

<br>
<span><b>CTR -  ${data[key].ctr} <i class="fa-solid fa-check" style="color:green;"></i></span>
</div>
</b>
</div>`;
        } else {
          engagementData.innerHTML = `
<div class="inner-data">
 <b> <span></span>  <code><i class="fa-regular fa-id-badge" style="font-size:1.1em;"></i> : <span style="font-size:1.3em;"> ${
   data[key].id
 }</span></b> </code> 
</b>
<br/>
  <span> <b>Name : ${data[key].name}</b> </span>
<br/>
 <span> <b>Status : ${
   data[key].status == "ENABLED"
     ? '<i class="fa-solid fa-circle-check" style="color:green;"></i>'
     : '<i class="fa-solid fa-circle-xmark"  style="color:red;"></i>'
 } </b> </span>
<br/>

  <span> <b><i class="fa-solid fa-rectangle-ad" style="font-size:1.2em;"></i> : ${
    data[key].ads.headline
  }</b> </span>

<br />
 <span> <b>CPA : ${data[key].cpa}</b> </span>
<br/>
<span> <b>ROAS : ${
            data[key].roas
          }</b> <i class="fa-solid fa-check" style="color:green;"></i></span>
</div>
`;
        }
      }
    }, 2000);
  })
  .catch((error) => {
    console.log(error);
    // console.error(error);
  });

const form = document.querySelector("#my-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const serializedFormData = {};
  for (const [key, value] of formData.entries()) {
    serializedFormData[key] = value;
  }

  axios
    .post("http://localhost:8080/api/google/v1", serializedFormData)
    .then((response) => {
      alert("submitted");
      form.reset();
    })
    .catch((error) => {
      alert("An error occurred while submitting the form data:", error);
    });
});
