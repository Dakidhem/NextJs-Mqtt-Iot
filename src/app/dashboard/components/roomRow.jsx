import DeviceRow from "./deviceRow";

const RoomRow = ({ room, devices }) => {
  //component for each room
  return (
    <div
      key={room._id}
      className="cursor-pointer border shadow-lg px-8 py-4 mb-8 rounded-xl min-h-[150px]"
    >
      <h2 className="text-xl font-bold mb-8 text-secondary">
        {room.number}{" "}
        <span className="text-gray-400 text-[10px]">{room._id}</span>
      </h2>

      <div className="flex justify-center items-center h-full">
        {room.devices.length > 0 ? (
          <table class="w-full text-sm text-left text-gray-500 rounded flex flex-row sm:table">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr className="flex flex-col sm:table-row ">
                <th scope="col" class="px-6 py-4">
                  Device Id
                </th>
                <th scope="col" class="px-6 py-4">
                  Device Serial Number
                </th>
                <th scope="col" class="px-6 py-4 sm:text-center">
                  State
                </th>
              </tr>
            </thead>
            <tbody>
              {room.devices.map((device) => (
                <DeviceRow key={device.id} device={device} devices={devices} />
              ))}
            </tbody>
          </table>
        ) : (
          <p className="font-bold text-gray-400">There are no devices.</p>
        )}
      </div>
    </div>
  );
};

export default RoomRow;
