import type { MeetingClient, MeetingDetails, MeetingPlotInspectRef, PlannedMeeting } from '../types.api'
import type { _MeetingClient, _MeetingDetails, _PlannedMeeting } from './types.adapter'

export class MeetingAdapter {
	public static fromApiToPlannedMeetings(data: _PlannedMeeting[]): PlannedMeeting[] {
		return data.map((item) => ({
			id: item.id,
			date: item.dateToVisit,
			status: item.statusVisit,
			meetingClients: MeetingAdapter.fromApiToMeetingClients(item.clients),
		}))
	}

	public static fromApiToMeetingClients(data: _MeetingClient[]): MeetingClient[] {
		return data.map((item) => ({
			id: item.visitId,
			name: item.clientName,
			iin: item.clientIin,
			address: item.clientAddress,
			meetingType: item.visitTypeName,
			meetingTypeId: item.visitTypeId,
			meetingId: item.meetingTypeId,
			meetingName: item.meetingTypeName,
			meetingTime: item.meetingTime,
			plotId: item.plotId,
		}))
	}

	public static fromApiToPlannedMeetingDetails(data: _MeetingDetails): MeetingDetails {
		return {
			client: data.clientObj[0]!,
			providedServices: data.workDone ? data.workDone.map((item) => ({ ...item, id: Number(item.id) })) : null,
			contractComplications: data.contractComplication
				? data.contractComplication.map((item) => ({ ...item, id: Number(item.id) }))
				: null,
			plotInspects: data.fieldsInsp
				? data.fieldsInsp.map((item) => ({ ...item, id: Number(item.id), category: Number(item.category) }))
				: null,
			recommends: data.recomend ? data.recomend.map((item) => ({ ...item, id: Number(item.id) })) : null,
		}
	}

	public static fromApiToMeetingPlotInspectsRefs(data: MeetingPlotInspectRef[]): MeetingPlotInspectRef[][] {
		const resultData: MeetingPlotInspectRef[][] = []
		const categoriesId: number[] = []

		for (let i = 0; i <= data.length; i++) {
			const item = data[i]
			if (!item) continue
			if (categoriesId.includes(item.categoryId)) continue

			const items: MeetingPlotInspectRef[] = [item]
			categoriesId.push(item.categoryId)

			for (let y = i; y <= data.length; y++) {
				const deepItem = data[y]
				if (!deepItem) continue
				if (item.categoryId === deepItem.categoryId) {
					items.push(deepItem)
				}
			}

			resultData.push(items)
		}

		console.log(resultData)
		return resultData
	}
}
