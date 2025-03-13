import React from "react";
import CalendarApp from '../../components/Calendar/Calendar';

const CalendarPage = () => {
    return (
        <div class="flex flex-row">
          {/* calendar */}
          <div class="w-4/5">
            <CalendarApp />
          </div>
          {/* task list & add task */}
          <div class="w-1/5">
            <div class="flex flex-col">
                {/* task list */}
                <div class="h-2/3">
                    <div class="flex flex-col">
                        <div class="w-1/2">task 1</div>
                        <div class="w-1/2">task 2</div>
                    </div>
                </div>
                {/* add task */}
                <div class="h-1/3">
                    ADD TASK 
                </div>
            </div>
          </div>
        </div>
    );
};

export default CalendarPage;