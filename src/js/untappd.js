const clientId = 'B443B328112B2CE689823416FBBE03353B9497F0';
const clientSecret = 'F6C3122C0EE5975CC3535EDCB908319116651F5D';

const url = new URL('https://api.untappd.com/v4/user/checkins/WeebleWobb?client_id='+clientId+'&client_secret='+clientSecret);

fetch(url)
  .then((response) => {
    return response.json()
  })
  .then((data) => {

    // Isolating checkin details
    const untappd = data.response.checkins.items;
    
    untappd.forEach(checkins => {
      
      console.log(data);

      // Selects where checkins will live
      const checkin_container = document.getElementById('js-checkin-container');
            
      // Cunstruct checkin card
      const checkin = document.createElement('div');
      checkin.setAttribute('class', 'checkin');

      checkin_container.appendChild(checkin);

      // Construct checkin__header
      const checkin_header = document.createElement('header');
      checkin_header.setAttribute('class', 'checkin__header');

      checkin.appendChild(checkin_header);

        // Checkin Image
        const checkin_img = document.createElement('img');

        if(typeof checkins.media.items[0] !== "undefined" ) {
          checkin_img.src = checkins.media.items[0].photo.photo_img_sm;
        } else {
          checkin_img.src = 'https://placehold.it/100x100'
        }
        
        checkin_header.appendChild(checkin_img);

        // Checking Beer Info
        const beer_info = document.createElement('div');
        beer_info.setAttribute('id', 'js-beer-info');

          const beer_name = document.createElement('h5');
          beer_name.textContent = checkins.beer.beer_name.substring(0, 30);
        
          const brewery_name = document.createElement('h6');
          brewery_name.textContent = checkins.brewery.brewery_name;

          const beer_style = document.createElement('h6');
          beer_style.textContent = checkins.beer.beer_style;

        checkin_header.appendChild(beer_info);
        beer_info.appendChild(beer_name);
        beer_info.appendChild(brewery_name);
        beer_info.appendChild(beer_style);

      // Construct checkin__body
      const checkin_body = document.createElement('div');
      checkin_body.setAttribute('class', 'checkin__body');

        const description = document.createElement('p');
        description.textContent = checkins.checkin_comment;
      
      checkin.appendChild(checkin_body);
      checkin_body.appendChild(description);

      // Construct checkin__footer
      const checkin_footer = document.createElement('footer');
      checkin_footer.setAttribute('class', 'checkin__footer');
      
      checkin.appendChild(checkin_footer);

        const abv = document.createElement('div');
        abv.setAttribute('class', 'abv');
        abv.textContent = 'ABV: ' + checkins.beer.beer_abv + '%';

        checkin_footer.appendChild(abv);

        // Setting up rating star
        const rating_container = document.createElement('div');
        const checkin_id = checkins.checkin_id;
        rating_container.setAttribute('class', `rating  js-${checkin_id}`);

        const rating_inner = document.createElement('div');
        rating_inner.setAttribute('class', 'rating__inner');
        
          const rating = checkins.rating_score;
          const rating_total = 5;

          const rating_percentage = (rating / rating_total) * 100;

          checkin_footer.appendChild(rating_container);
          rating_container.appendChild(rating_inner);

          document.querySelector(`.js-${checkin_id} .rating__inner`).style.width = `${rating_percentage}%`;
        
        // Setting up checkin date
        const checkin_date = document.createElement('div');
        checkin_date.setAttribute('class', 'checkin-date');
        const date = new Date(checkins.created_at);
        const options = { month: 'short', day: 'numeric', year: 'numeric'}
        let formatted_date = `Checked in: ${date.toLocaleDateString('en-US', options)}`;
        checkin_date.textContent = formatted_date;

        checkin_footer.appendChild(checkin_date);


      // Putting it all together

    });

  })
.catch((err) => {
  console.log(err);
});

