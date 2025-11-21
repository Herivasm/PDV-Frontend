"use client"

import { ReactNode } from "react"

type ModalProps = {
    show: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    children: ReactNode
}

export default function Modal({ show, onClose, onConfirm, title, children }: ModalProps) {
    if (!show) return null

    return (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            
            <div className="relative mx-auto p-5 border border-white w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
                    <div className="mt-2 px-7 py-3">
                        <p className="text-sm text-gray-500">
                            {children}
                        </p>
                    </div>
                    <div className="items-center px-4 py-3">
                        <div className="flex gap-4 justify-center">
                            <button
                                id="cancel-btn"
                                className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
                                onClick={onClose}
                            >
                                Cancelar
                            </button>
                            <button
                                id="ok-btn"
                                className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                                onClick={onConfirm}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}