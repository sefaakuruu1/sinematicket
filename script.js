const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();

container.addEventListener('click', function(e) {
   if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {//target vererek tıklanan yeri yazdırıyoruz
       e.target.classList.toggle('selected');//toggle sayesınde eleman varsa sileriz yoksa ekleriz
       calculateTotal()      
    }
});

select.addEventListener('change', function(e) {
    calculateTotal();  
});

function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function(seat) {
        selectedSeatsArr.push(seat);
        //bos arraya gelen seatleri arraya push metodu ile ekledik
    });

    seats.forEach(function(seat) {
        seatsArr.push(seat);
        //tum seatlerı arraya ekledi
    });

    // [1,3,5]
    let selectedSeatIndexs = selectedSeatsArr.map(function(seat) {
        //seçtiğimiz elemanın hangı ındext eoldugunu bize donderiyor.
//selected olanların listesi elimize gelmiş olur
        return seatsArr.indexOf(seat);
    });

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {
   //local storage dan uygulamaya okuma bu selkılde yapılır
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !=null && selectedSeats.length > 0) {
        seats.forEach(function(seat, index) {
            //herhangi bir seçilmiş deger varsa selected listesine ekleriz
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }



    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}
//local storage kaydetmemizi saglar.
function saveToLocalStorage(indexs) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    //indexleri kaydetmemizi saglar
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}



