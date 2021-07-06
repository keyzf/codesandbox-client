import { Directory, Module } from '@codesandbox/common/lib/types';
import { notificationState } from '@codesandbox/common/lib/utils/notifications';
import { NotificationStatus } from '@codesandbox/notifications';
import { useAppState, useEffects } from 'app/overmind';
import { getType } from 'app/utils/get-type.ts';
import React from 'react';

import { Entry } from '../Entry';

interface IModuleEntryProps {
  module: Module;
  readonly?: boolean;
  setCurrentModule?: (id: string) => void;
  store?: any;
  signals?: any;
  markTabsNotDirty?: () => void;
  depth?: number;
  renameModule?: (title: string, moduleShortid: string) => void;
  deleteEntry?: (shortid: string, title: string) => void;
  discardModuleChanges?: (shortid: string, title: string) => void;
  getModulePath?: (
    modules: Module[],
    directories: Directory[],
    id: string
  ) => string;
  renameValidator?: (id: string, title: string) => string | false | null;
  isActive: boolean;
}

export const ModuleEntry: React.FC<IModuleEntryProps> = React.memo(
  ({
    module,
    setCurrentModule,
    markTabsNotDirty,
    depth,
    readonly,
    renameModule,
    deleteEntry,
    discardModuleChanges,
    getModulePath,
    renameValidator,
    isActive,
  }) => {
    const {
      browser: { copyToClipboard },
    } = useEffects();
    const {
      editor: { mainModule, currentSandbox },
      live,
    } = useAppState();
    const isMainModule = module.id === mainModule.id;
    const type = getType(module.title);
    const hasError = module.errors.length > 0;
    const liveUsers = live.liveUsersByModule[module.shortid] || [];

    const isNotSynced = module.savedCode && module.code !== module.savedCode;

    const showESModuleItem: boolean = !!(
      module &&
      module.path &&
      currentSandbox.template === 'esm-react'
    );

    const handleCopyESModuleUrl = React.useCallback(() => {
      const esmoduleUrl = new URL(
        module.path.substr(1),
        `https://esmodule-cdn.fly.dev/${currentSandbox.id}/fs/`
      );
      esmoduleUrl.searchParams.set(
        'mtime',
        `${new Date(module.updatedAt).getTime()}`
      );
      copyToClipboard(esmoduleUrl.href);
      notificationState.addNotification({
        message: 'Copied ESModule URL',
        status: NotificationStatus.SUCCESS,
      });
    }, [currentSandbox.id, module.updatedAt, module.path, copyToClipboard]);

    return (
      // @ts-ignore
      <Entry
        id={module.id}
        readonly={readonly}
        shortid={module.shortid}
        title={module.title}
        rightColors={liveUsers.map(([a, b, c]) => `rgb(${a}, ${b}, ${c})`)}
        depth={depth + 1}
        active={isActive}
        type={type || 'function'}
        rename={renameModule}
        deleteEntry={deleteEntry}
        isNotSynced={isNotSynced}
        renameValidator={renameValidator}
        setCurrentModule={setCurrentModule}
        isMainModule={isMainModule}
        moduleHasError={hasError}
        markTabsNotDirty={markTabsNotDirty}
        discardModuleChanges={discardModuleChanges}
        getModulePath={getModulePath}
        copyESModuleURL={showESModuleItem ? handleCopyESModuleUrl : null}
      />
    );
  }
);
