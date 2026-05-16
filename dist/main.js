const stopTypes = ["Loading","Unloading","Customs","Ferry","Border","Parking","Fuel","Document pickup","Document dropoff","Other"];
const instructionDefaults = ["arrive at location","pick up documents","drop off documents","wait for customs clearance","board ferry","call dispatcher"];
const state={orders:[]};
const modal=document.getElementById('orderModal');
const stopsEl=document.getElementById('stops');

function createStop(prefill={}){
 const node=document.getElementById('stopTemplate').content.firstElementChild.cloneNode(true);
 const type=node.querySelector('.type'); stopTypes.forEach(t=>{const o=document.createElement('option');o.value=t;o.textContent=t;type.appendChild(o)});
 type.value=prefill.type||'Loading';
 node.querySelector('.location').value=prefill.location||'';
 node.querySelector('.datetime').value=prefill.datetime||'';
 node.querySelector('.notes').value=prefill.notes||'';
 node.querySelector('.task').value=prefill.task||'';
 node.querySelector('.instruction').value=prefill.instruction||instructionDefaults[0];
 node.querySelector('.completed').checked=!!prefill.completed;
 node.querySelector('.remove').onclick=()=>node.remove();
 stopsEl.appendChild(node);
}

document.getElementById('openModal').onclick=()=>{modal.showModal(); if(!stopsEl.children.length){createStop({type:'Loading'});createStop({type:'Unloading'});} };
document.getElementById('addStop').onclick=()=>createStop();

document.getElementById('orderForm').addEventListener('submit',(e)=>{
  e.preventDefault();
  const stops=[...stopsEl.querySelectorAll('.stop')].map(s=>({
    type:s.querySelector('.type').value,
    location:s.querySelector('.location').value,
    datetime:s.querySelector('.datetime').value,
    notes:s.querySelector('.notes').value,
    task:s.querySelector('.task').value,
    instruction:s.querySelector('.instruction').value,
    completed:s.querySelector('.completed').checked,
  }));
  if(!stops.length) return;
  const order={id:`ORD-${state.orders.length+1}`.padStart(7,'0'),stops};
  state.orders.unshift(order);
  render();
  modal.close();
  stopsEl.innerHTML='';
});

function render(){
  const tbody=document.querySelector('#ordersTable tbody'); tbody.innerHTML='';
  state.orders.forEach(o=>{const tr=document.createElement('tr'); const first=o.stops[0];const last=o.stops[o.stops.length-1];
    tr.innerHTML=`<td>${o.id}</td><td>${first.location} → ${last.location}</td>`;
    tr.onclick=()=>renderTimeline(o);
    tbody.appendChild(tr);
  });
  if(state.orders[0]) renderTimeline(state.orders[0]);
}
function renderTimeline(order){
 const tl=document.getElementById('timeline'); tl.innerHTML='';
 order.stops.forEach((s,i)=>{const li=document.createElement('li');li.textContent=`${i+1}. ${s.type} • ${s.location} • ${s.datetime||'TBD'} • task: ${s.task||'-'} • ${s.completed?'completed':'open'}`; tl.appendChild(li);});
}
