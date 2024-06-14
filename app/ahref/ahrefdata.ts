import { create } from "zustand"

type AhrefsData = {
        keyword: string
        kd: number
        des: string
}
type AhrefsState = {
        ahrefData: AhrefsData[]
        ahrefError: string | null
        fetchAhrefs: (keywords: string) => void
}

const URL = process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
        : "http://localhost:3000/api"

export const useAhrefsStore = create<AhrefsState>((set) => ({
        ahrefData: [],
        ahrefError: null,
        // Define the useStore hook
        // Define the fetchAhrefs action correctly
        async fetchAhrefs(keywords: string) {
                try {
                        const response = await fetch(`${URL}/ahref/kd/`, {
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ keywords }),
                        })
                        if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`)
                        }
                        const data: AhrefsData[] = await response.json()
                        set((state) => ({ ahrefData: data }))

                } catch (error) { // Type the error as 'unknown' and cast when using properties
                        if (error instanceof Error) {
                                console.error("Error AhrefsData:", error)
                        } else {
                                // Handle the case where error is not an instance of Error
                                console.error("Error AhrefsData :", error)
                        }

                }
        },
}))