"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { 
  Trash2,
  Edit,
  Copy,
  Archive,
  Unarchive,
  Eye,
  EyeOff,
  Download,
  MoreHorizontal
} from 'lucide-react'

interface BulkAction {
  id: string
  label: string
  icon: React.ReactNode
  variant?: 'default' | 'destructive' | 'outline'
  action: (selectedIds: string[]) => Promise<void>
  confirmMessage?: string
}

interface BulkActionsProps {
  selectedIds: string[]
  onClearSelection: () => void
  actions: BulkAction[]
  className?: string
}

export function BulkActions({ selectedIds, onClearSelection, actions, className = "" }: BulkActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)

  if (selectedIds.length === 0) {
    return null
  }

  const handleAction = async (action: BulkAction) => {
    setIsLoading(true)
    try {
      await action.action(selectedIds)
      onClearSelection()
    } catch (error) {
      console.error('Bulk action error:', error)
      alert('一括操作中にエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  const getSelectedAction = () => {
    return actions.find(action => action.id === selectedAction)
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {selectedIds.length}件選択中
          </span>
          <Button variant="ghost" size="sm" onClick={onClearSelection}>
            選択解除
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick Actions */}
          {actions.slice(0, 3).map((action) => (
            <Button
              key={action.id}
              variant={action.variant || 'outline'}
              size="sm"
              onClick={() => handleAction(action)}
              disabled={isLoading}
            >
              {action.icon}
              <span className="ml-2">{action.label}</span>
            </Button>
          ))}

          {/* More Actions Dropdown */}
          {actions.length > 3 && (
            <Select value={selectedAction || ""} onValueChange={setSelectedAction}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="その他の操作" />
              </SelectTrigger>
              <SelectContent>
                {actions.slice(3).map((action) => (
                  <SelectItem key={action.id} value={action.id}>
                    <div className="flex items-center space-x-2">
                      {action.icon}
                      <span>{action.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Execute Selected Action */}
          {selectedAction && getSelectedAction() && (
            <ConfirmDialog
              title={getSelectedAction()!.label}
              description={getSelectedAction()!.confirmMessage || `選択された${selectedIds.length}件に対して${getSelectedAction()!.label}を実行しますか？`}
              onConfirm={() => {
                const action = getSelectedAction()
                if (action) {
                  handleAction(action)
                  setSelectedAction(null)
                }
              }}
              triggerText="実行"
              confirmText="実行"
            />
          )}
        </div>
      </div>
    </div>
  )
}

// Predefined bulk actions
export const createBulkActions = {
  delete: (onDelete: (ids: string[]) => Promise<void>): BulkAction => ({
    id: 'delete',
    label: '削除',
    icon: <Trash2 className="h-4 w-4" />,
    variant: 'destructive' as const,
    action: onDelete,
    confirmMessage: '選択された項目を削除しますか？この操作は取り消せません。'
  }),

  publish: (onPublish: (ids: string[]) => Promise<void>): BulkAction => ({
    id: 'publish',
    label: '公開',
    icon: <Eye className="h-4 w-4" />,
    action: onPublish,
    confirmMessage: '選択された項目を公開しますか？'
  }),

  unpublish: (onUnpublish: (ids: string[]) => Promise<void>): BulkAction => ({
    id: 'unpublish',
    label: '非公開',
    icon: <EyeOff className="h-4 w-4" />,
    action: onUnpublish,
    confirmMessage: '選択された項目を非公開にしますか？'
  }),

  archive: (onArchive: (ids: string[]) => Promise<void>): BulkAction => ({
    id: 'archive',
    label: 'アーカイブ',
    icon: <Archive className="h-4 w-4" />,
    action: onArchive,
    confirmMessage: '選択された項目をアーカイブしますか？'
  }),

  unarchive: (onUnarchive: (ids: string[]) => Promise<void>): BulkAction => ({
    id: 'unarchive',
    label: 'アーカイブ解除',
    icon: <Unarchive className="h-4 w-4" />,
    action: onUnarchive,
    confirmMessage: '選択された項目のアーカイブを解除しますか？'
  }),

  duplicate: (onDuplicate: (ids: string[]) => Promise<void>): BulkAction => ({
    id: 'duplicate',
    label: '複製',
    icon: <Copy className="h-4 w-4" />,
    action: onDuplicate,
    confirmMessage: '選択された項目を複製しますか？'
  }),

  export: (onExport: (ids: string[]) => Promise<void>): BulkAction => ({
    id: 'export',
    label: 'エクスポート',
    icon: <Download className="h-4 w-4" />,
    action: onExport,
    confirmMessage: '選択された項目をエクスポートしますか？'
  })
} 