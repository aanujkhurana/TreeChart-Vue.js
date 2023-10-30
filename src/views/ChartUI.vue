<script setup lang = "ts" >
import hashIcon from '@/components/Icons/TreeChartUI/hashIcon.vue';
import ownerIcon from '@/components/Icons/TreeChartUI/ownerIcon.vue';
import costIcon from '@/components/Icons/TreeChartUI/costIcon.vue';
import massIcon from '@/components/Icons/TreeChartUI/massIcon.vue';
import leadtimeIcon from '@/components/Icons/TreeChartUI/leadtimeIcon.vue';
import makeIcon from '@/components/Icons/TreeChartUI/makeIcon.vue';
import buyIcon from '@/components/Icons/TreeChartUI/buyIcon.vue';
import makeBuyIcon from '@/components/Icons/TreeChartUI/makeBuyIcon.vue';
import logicalIcon from '@/components/Icons/TreeChartUI/logicalIcon.vue';
import nlogicalIcon from '@/components/Icons/TreeChartUI/nlogicalIcon.vue';
import buildIcon from '@/components/Icons/TreeChartUI/buildIcon.vue';
import notbuildIcon from '@/components/Icons/TreeChartUI/notbuildIcon.vue';

defineProps({ data: Object });
</script>

<template>
  <div class="card-ui">
    <div class="bg"></div>
    <div class="hash">
      <div class="hashbg"></div>
      <div class="hashbglong"></div>
      <hashIcon/>
      <div class="hash3">Hash</div>
      <div class="hash4">{{ data.hash || 'no hash' }}</div>
    </div>
    <div class="owner">
      <div class="ownerbg"></div>
      <div class="ownerbglong"></div>
      <ownerIcon/>
      <div class="owner3">Owner</div>
      <div class="owner4"> {{ data.Name || 'noname'}}</div>
    </div>
    <div class="cost">
      <div class="cost-usd">Cost ({{ data.currency || 'USD' }})</div>
      <div class="cost2">
      <costIcon/>
        <div class="cost3">{{ data.cost || "0" }}</div>
      </div>
    </div>
    <div class="mass">
      <div class="mass-g">Mass (g)</div>
      <div class="mass2">
        <massIcon/>
        <div class="mass4">{{ data.mass || 0 }}</div>
      </div>
    </div>
    <div class="leadtime">
      <div class="lead-time-days">LeadTime (days)</div>
      <div class="leadtime2">
        <leadtimeIcon/>
        <div class="lead">{{ data.leadtime || 0 }}</div>
      </div>
    </div>
    <div class="status">
      <div class="statusbg"></div>
      <div :class="['statusbglong', { 'draft': data.status === 'draft', 'cDesign': data.status === 'critical design','pDesign': data.status === 'preliminary design', 'production': data.status === 'production', 'qualified': data.status === 'qualified' }]">
      </div>
      <div class="status2">Status</div>
      <div class="status3">{{ data.status || 'none' }}</div>
    </div>
    <div class="qty">
      <div class="otybg"></div>
      <div class="otybglong"></div>
      <div class="qty2">Quantity</div>
      <div class="qty3">{{data.quantity || 0 }}</div>
    </div>
    <img v-if="data.imageUrl" class="image" :src="data.imageUrl" alt="Component Image"/>
    <div class="name">
      <div class="name2">{{ data.name }}</div>
      <div class="cn-revision">CPN: {{ data.componentNumber || 'none' }} Revision: {{ data.revision || 'None' }}</div>
    </div>
    <div class="morb">
      <makeIcon v-if="data.makeorbuy === 'Make' || data.makeorbuy === 'make'"/>
      <buyIcon  v-else-if="data.makeorbuy === 'buy'"/>
      <makeBuyIcon v-else/>
    </div>
    <div class="logical" v-if="data.islogical === true">
      <logicalIcon/>
    </div>
    <div class="Nlogical" v-else>
        <nlogicalIcon/>
    </div>
    <div class="boi" v-if="data.buildoninstallation === true">
      <buildIcon/>
    </div>
    <div class="Nboi" v-else>
      <notbuildIcon/>
    </div>
  </div>
</template>

<style scoped>
.card-ui,
.card-ui * {
  box-sizing: border-box;
}
.card-ui {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
}
.bg {
  background: linear-gradient(180deg, rgb(246, 246, 246), rgba(255, 255, 255, 0.7));
  border-radius: 8px;
  border-style: solid;
  border-color: transparent;
  border-width: 2px;
  flex-shrink: 0;
  width: 380px;
  height: 380px;
  position: relative;
  box-shadow: 0px -8px 75px 8px rgba(91, 91, 125, 0.6);
}
.hash {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-shrink: 0;
  width: 327px;
  position: absolute;
  left: 27px;
  top: 308px;
}
.hashbg {
  background: #d8dbe0;
  border-radius: 4px;
  border-style: solid;
  border-color: #e0f2fe;
  border-width: 2px 0px 0px 0px;
  opacity: 0.800000011920929;
  flex-shrink: 0;
  width: 60px;
  height: 24px;
  position: relative;
}
.hashbglong {
  background: #d8dbe0;
  border-radius: 4px;
  border-style: solid;
  border-color: #e0f2fe;
  border-width: 2px 0px 0px 0px;
  opacity: 0.800000011920929;
  flex-shrink: 0;
  width: 257px;
  height: 24px;
  position: relative;
}
.hash2 {
  flex-shrink: 0;
  position: absolute;
  left: 4.85px;
  top: 7px;
  overflow: visible;
}
.hash3 {
  color: #082f49;
  text-align: center;
  font: 500 10px/110% "inter", sans-serif;
  opacity: 0.800000011920929;
  position: absolute;
  left: 13px;
  top: 7px;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hash4 {
  color: #082f49;
  text-align: left;
  font: 500 10px/110% "inter", sans-serif;
  opacity: 0.800000011920929;
  position: absolute;
  left: 77px;
  top: 7px;
  width: 247px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.owner {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-shrink: 0;
  width: 327px;
  position: absolute;
  left: 27px;
  top: 276px;
}
.ownerbg {
  background: #d8dbe0;
  border-radius: 4px;
  border-style: solid;
  border-color: #e0f2fe;
  border-width: 2px 0px 0px 0px;
  opacity: 0.800000011920929;
  flex-shrink: 0;
  width: 60px;
  height: 24px;
  position: relative;
}
.ownerbglong {
  background: #d8dbe0;
  border-radius: 4px;
  border-style: solid;
  border-color: #e0f2fe;
  border-width: 2px 0px 0px 0px;
  opacity: 0.800000011920929;
  flex-shrink: 0;
  width: 257px;
  height: 24px;
  position: relative;
}
.owner2 {
  flex-shrink: 0;
  position: absolute;
  left: 4.85px;
  top: 6px;
  overflow: visible;
}
.owner3 {
  color: #082f49;
  text-align: center;
  font: 500 10px/110% "inter", sans-serif;
  opacity: 0.800000011920929;
  position: absolute;
  left: 14px;
  top: 6px;
  width: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.owner4 {
  color: #082f49;
  text-align: left;
  font: 500 10px/110% "inter", sans-serif;
  opacity: 0.800000011920929;
  position: absolute;
  left: 77px;
  top: 6px;
  width: 247px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.cost {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  width: 95px;
  position: absolute;
  left: 26px;
  top: 220px;
}
.cost-usd {
  color: #9fa2a8;
  text-align: center;
  font: 400 12px/100% "inter", sans-serif;
  position: relative;
  width: 69px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cost2 {
  background: #ffffff;
  border-radius: 6px;
  border-style: solid;
  border-color: #c1cde4;
  border-width: 1px;
  padding: 6px 18px 6px 18px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 86px;
  height: 22px;
  position: relative;
  overflow: hidden;
}
.vector {
  flex-shrink: 0;
  position: relative;
  overflow: visible;
}
.cost3 {
  color: #777c85;
  text-align: center;
  font: 700 12px/100% "inter", sans-serif;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mass {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  width: 94px;
  position: absolute;
  left: calc(40% - 10px);
  top: 220px;
}
.mass-g {
  color: #9fa2a8;
  text-align: center;
  font: 400 12px/100% "inter", sans-serif;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mass2 {
  background: #ffffff;
  border-radius: 6px;
  border-style: solid;
  border-color: #c1cde4;
  border-width: 1px;
  padding: 6px 18px 6px 18px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 86px;
  height: 22px;
  position: relative;
  overflow: hidden;
}
.mass3 {
  flex-shrink: 0;
  position: relative;
  overflow: visible;
}
.mass4 {
  color: #777c85;
  text-align: center;
  font: 700 12px/100% "inter", sans-serif;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.leadtime {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  width: 95px;
  position: absolute;
  left: 259px;
  top: 220px;
}
.lead-time-days {
  color: #9fa2a8;
  text-align: center;
  font: 400 12px/100% "inter", sans-serif;
  position: relative;
  width: 117px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.leadtime2 {
  background: #ffffff;
  border-radius: 6px;
  border-style: solid;
  border-color: #c1cde4;
  border-width: 1px;
  padding: 6px 18px 6px 18px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 86px;
  height: 22px;
  position: relative;
  overflow: hidden;
}
.time {
  flex-shrink: 0;
  position: relative;
  overflow: visible;
}
.lead {
  color: #777c85;
  text-align: center;
  font: 700 12px/100% "inter", sans-serif;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.status {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-shrink: 0;
  width: 172px;
  height: 26px;
  position: absolute;
  left: 186px;
  top: 118px;
}
.statusbg {
  background: #d8dbe0;
  border-radius: 6px;
  flex-shrink: 0;
  width: 70px;
  height: 26px;
  position: relative;
}
.statusbglong {
  background: #d8dbe0;
  border-radius: 6px;
  border-style: solid;
  border-color: #e0f2fe;
  border-width: 2px 0px 0px 0px;
  flex-shrink: 0;
  width: 92px;
  height: 26px;
  position: relative;
}
.draft {
  border-color: rgb(142, 85, 255); /* Change to the desired border color for Draft */
}

.cDesign {
  border-color: rgb(255, 0, 225); /* Change to the desired border color for Design */
  height: 36px;
}

.pDesign {
  border-color: rgb(0, 72, 255); /* Change to the desired border color for Design */
  height: 36px;
}

.production {
  border-color: rgb(255, 47, 47); /* Change to the desired border color for Production */
}

.qualified {
  border-color: rgb(25, 214, 91); /* Change to the desired border color for Obsolete */
}

.status2 {
  color: #082f49;
  text-align: center;
  font: 600 12px/140% "inter", sans-serif;
  position: absolute;
  left: 0px;
  top: 5px;
  width: 70px;
  height: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.status3 {
  color: #082f49;
  text-align: left;
  font: 600 12px "inter", sans-serif;
  position: absolute;
  left: 87px;
  top: 5px;
  width: 90px;
}
.qty {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-shrink: 0;
  width: 172px;
  position: absolute;
  left: 186px;
  top: 78px;
}
.otybg {
  background: #d8dbe0;
  border-radius: 6px;
  opacity: 0.800000011920929;
  flex-shrink: 0;
  width: 70px;
  height: 26px;
  position: relative;
}
.otybglong {
  background: #d8dbe0;
  border-radius: 6px;
  border-style: solid;
  border-color: #e0f2fe;
  border-width: 2px 0px 0px 0px;
  opacity: 0.800000011920929;
  flex-shrink: 0;
  width: 92px;
  height: 26px;
  position: relative;
}
.qty2 {
  color: #082f49;
  text-align: center;
  font: 600 12px/140% "inter", sans-serif;
  position: absolute;
  left: 0px;
  top: 5px;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.qty3 {
  color: #082f49;
  text-align: left;
  font: 700 12px/140% "inter", sans-serif;
  position: absolute;
  left: 87px;
  top: 5px;
  width: 82px;
}
.image {
  border-radius: 4px;
  border-style: solid;
  border-color: #bbc1cb;
  border-width: 1px;
  flex-shrink: 0;
  width: 146px;
  height: 130px;
  position: absolute;
  left: 22px;
  top: 78px;
}
.name {
  display: flex;
  flex-direction: column;
  gap: 9px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-shrink: 0;
  width: 324px;
  height: 38px;
  position: absolute;
  left: 27px;
  top: 24px;
}
.name2 {
  color: #082f49;
  text-align: left;
  font: 700 18px/100% "Inter", sans-serif;
  position: relative;
  width: 336px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.cn-revision {
  color: #777c85;
  text-align: left;
  font: 700 14px/100% "Inter", sans-serif;
  position: absolute;
  left: 0px;
  top: 23px;
  width: 336px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.morb {
  background: #003a9a;
  border-radius: 8px;
  border-style: solid;
  border-color: #4285f4;
  border-width: 1px;
  padding: 7px 11px 7px 11px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  position: absolute;
  left: 186px;
  top: 158px;
  overflow: hidden;
}
.makeorbuy * {
  box-sizing: border-box;
}
.makeorbuy {
  flex-shrink: 0;
  position: relative;
  overflow: visible;
}
.logical {
  background: #003a9a;
  border-radius: 8px;
  border-style: solid;
  border-color: #4285f4;
  border-width: 1px;
  padding: 7px 11px 7px 11px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  position: absolute;
  left: 247px;
  top: 158px;
  overflow: hidden;
}
.Nlogical {
  background: #DDDDDD;
  border-radius: 8px;
  border-style: solid;
  border-color: #eeeeee;
  border-width: 1px;
  padding: 7px 11px 7px 11px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  position: absolute;
  left: 247px;
  top: 158px;
  overflow: hidden;
}
.logical2 {
  flex-shrink: 0;
  position: relative;
  overflow: visible;
}
.boi {
  background: #003a9a;
  border-radius: 8px;
  border-style: solid;
  border-color: #4285f4;
  border-width: 1px;
  padding: 7px 11px 7px 11px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  position: absolute;
  left: 308px;
  top: 158px;
  overflow: hidden;
}
.Nboi {
  background: #DDDDDD;
  border-radius: 8px;
  border-style: solid;
  border-color: #eeeeee;
  border-width: 1px;
  padding: 7px 11px 7px 11px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  position: absolute;
  left: 308px;
  top: 158px;
  overflow: hidden;
}
.build {
  flex-shrink: 0;
  position: relative;
  overflow: visible;
}
</style>