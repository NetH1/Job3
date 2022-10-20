import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTicketsStore = defineStore('tickets', () => {
  const tickets = ref([
        {id:1, event_id:62, event_date:"2021-10-18 13:00:00", ticket_adult_price:700, ticket_adult_quantity:1, ticket_kid_price:450, ticket_kid_quantity:0, barcode:1111, user_id:1325, equal_price:null, created:"2021-01-11 13:22:09"}, 
        {id:2, event_id:44, event_date:"2021-10-18 13:00:00", ticket_adult_price:1000, ticket_adult_quantity:0, ticket_kid_price:800, ticket_kid_quantity:2, barcode:2222, user_id:2721, equal_price:null, created:"2021-01-11 13:22:09"}, 
        {id:3, event_id:76, event_date:"2021-10-18 13:00:00", ticket_adult_price:700, ticket_adult_quantity:4, ticket_kid_price:450, ticket_kid_quantity:3, barcode:3333, user_id:3443, equal_price:null, created:"2021-01-11 13:22:09"}
  ])
  function AddTicket() {
    this.tickets.push({
        id: Date.now() * 2,
        event_id: Math.floor(Math.random() * (100 - 1 + 1 ) + 1),
        ticket_adult_price:null,
        ticket_adult_quantity: null
    })
  } 
  return {tickets, AddTicket }
})