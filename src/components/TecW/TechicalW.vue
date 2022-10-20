<script setup>
import { storeToRefs } from "pinia";
import { useTicketsStore } from "../../stores/funcT";

const ticketStore = useTicketsStore()

const { tickets } = storeToRefs(ticketStore);
function BuyT() {
  ticketStore.AddTicket()
}
console.log(tickets);
</script>
<template>
  <div>
    <div class="bg-gray-300 py-14 text-lg">
    <!-- <div v-for="ticket in tickets" :key="ticket.id">
      <p>dfsaf</p>
      {{ ticket.id }}
    </div> -->
    <div class="container mx-auto flex gap-x-12 justify-between mt-8">
      <div>
        <select
        name="route"
        id="route"
        v-model="SelectedOption"
        @change="ChangeOption"
      >
        <option disabled value="Выберите направление">Выберите направление</option>
        <option value="из A в B">из A в B</option>
        <option value="из B в A">из B в A</option>
        <option value="из A в B и обратно в А">из A в B и обратно в А</option>
      </select>

      <label for="time" v-show="option == 1 || option == 2 || option == 3">Выберите время</label>
      <select v-model="SelectedTime" @change="ChangeOptionTime" name="time" id="time" v-show="option == 1">
        <option value="18:00">18:00(из A в B)</option>
        <option value="18:30">18:30(из A в B)</option>
        <option value="18:45">18:45(из A в B)</option>
        <option value="19:00">19:00(из A в B)</option>
        <option value="19:15">19:15(из A в B)</option>
      </select>

      <select v-model="SelectedTime" @change="ChangeOptionTime" name="" id="" v-show="option == 3">
        <option value="21:00">
          21:00(из A в B и обратно в А)
        </option>
        <option value="18:30">
          18:30(из A в B и обратно в А)
        </option>
        <option value="18:45">
          18:45(из A в B и обратно в А)
        </option>
      </select>

      <select v-model="SelectedTime" @change="ChangeOptionTime" name="" id="" v-show="option == 2">
        <option value="19:00">19:00(из B в A)</option>
        <option value="19:15">19:15(из B в A)</option>
        <option value="19:35">19:35(из B в A)</option>
        <option value="21:50">21:50(из B в A)</option>
        <option value="21:55">21:55(из B в A)</option>
      </select>
      </div>
      <div class="flex gap-x-14">
      <label for="num">Количество билетов</label>
<input v-model="AmountTickets" id="num">
<button @click="CalculteTicket">Посчитать</button>
    </div>
    </div>
  </div>
  <div class="px-14 text-xl text-white  bg-stone-500 py-14 tracking-wider" :class="{'hidden': show, 'block':!show }">
    <p class="py-4">Вы выбрали {{AmountTickets}} билета по маршруту {{SelectedOption}} стоимостью {{Total}}р.</p>
    <p class="py-4">Это путешествие займет у вас {{TimeT}} минут. </p>
    <p class="py-4">Теплоход отправляется в {{TimeOfTravelLocal}}, а прибудет в {{YourTimeArrived}}.</p>
    <button @click="BuyT">Купить</button>
  </div>
  <div v-for="ticket in tickets" :key="ticket.id">
    <p>{{ticket.id}}</p>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: 0,
      SelectedOption: "Выберите направление",
      AmountTickets: 0,
      TimeT: 0,
      Total: 0,
      TicketPrice:0,
      SelectedTime: '',
      TimeOfTravel: 0,
      TimeOfTravelLocal: 0,
      YourTimeArrived: null,
      show: true
    };
  },
  methods: {
    ChangeOption(e) {
      console.log(e);
      this.$emit("update:SelectedOption", e.target.value);
      if (this.SelectedOption === "из A в B") {
        this.option = 1;
        this.TicketPrice = 700;
        this.TimeT = 50
      }
      if (this.SelectedOption === "из B в A") {
        this.option = 2;
        this.TicketPrice = 700;
        this.TimeT = 50
      }
      if (this.SelectedOption === "из A в B и обратно в А") {
        this.option = 3;
        this.TicketPrice = 1200;
        this.TimeT = 100
      } else {
        console.log("nothing");
      }
    },
    ChangeOptionTime(e) {
      this.$emit("update:SelectedTime", e.target.value);
    },
    CalculteTicket() {
      this.Total = this.AmountTickets * this.TicketPrice
      this.show = false
      this.TimeOfTravel = parseInt(this.SelectedTime)
      this.TimeOfTravelLocal = this.FromStringToNumber
      this.YourTimeArrived = this.formatDate
     },

    //  FromStringToNumber() {
    //   var CurrentTime = new Date();
    // CurrentTime.setMinutes(CurrentTime.getMinutes());
    // let b = CurrentTime.getTimezoneOffset()/60
    // let res = CurrentTime.getUTCHours() - b + ':' + CurrentTime.getMinutes()
    // console.log(res);
    // console.log(CurrentTime.getHours()+":"+CurrentTime.getMinutes());
    //  }
  },
  computed: {
   FromStringToNumber() {
    const CurrentTime = new Date();
    CurrentTime.setMinutes(CurrentTime.getMinutes());
    let b = -CurrentTime.getTimezoneOffset()/60
    let c = CurrentTime.setHours(this.TimeOfTravel) 
    var d = new Date();
    var e = d.getHours()
    let res2 = CurrentTime.getHours() - e
    var h = new Date();
    var m = h.setHours(CurrentTime.getHours() + res2)
    var i = h.getHours() 
    return i
     },
     formatDate() {
    const today = new Date();
    const p = today.setHours(this.FromStringToNumber);
    const b = today.setMinutes(today.getMinutes() + this.TimeT);
    const time = today.getHours() + ":" + today.getMinutes();
    console.log(time);
    return time;
   },
  },
};
</script>
